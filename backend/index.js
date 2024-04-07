const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cors = require('cors');
const resend = require('resend');
const PORT = process.env.PORT || 3000;

const { Pool } = require('pg');
require('dotenv').config();
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Range,X-Content- Range'
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: false }))

const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: {
        require: true,
    },
});

async function getPgVersion() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT version()');
        console.log(result.rows[0]);
    } finally {
        client.release();
    }
}


const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    imageURL VARCHAR(200),
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

const insertDataQuery = `
    INSERT INTO users (name, username, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *
`;


app.post('/signup', async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const checkUserQuery = `
            SELECT * FROM users
            WHERE username = $1 OR email = $2;
        `;
        const checkUserResult = await pool.query(checkUserQuery, [username, email]);

        if (checkUserResult.rows.length > 0) {
            // If username or email is already taken, return appropriate message
            const takenField = checkUserResult.rows[0].username === username ? 'username' : 'email';
            return res.json({ success: false, message: `${takenField} already taken` });
        }
        else {
            await pool.query(insertDataQuery, [name, username, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return res.json({ success: false, message: "Error inserting data" });
                }
                else {
                    console.log('Data inserted successfully:', result.rows[0]);
                    const secretKey = crypto.randomBytes(32).toString('hex');
                    const token = jwt.sign({ userId: result.rows[0].id }, secretKey, { expiresIn: '1h' });
                    return res.json({ success: true, message: "Data inserted successfully", token: token, userId: result.rows[0].id });
                }
            })
        }
    }
    catch (err) {
        console.log(err);
        return res.json({ success: false, message: "Error inserting data" });
    }
})
app.post('/create-profile/:id', (req, res) => {
    const { id } = req.params;
    const query = `
        UPDATE users
        SET imageURL = $1, location = $2
        WHERE id = $3
        RETURNING *
    `;
    const { imageUrl, location } = req.body;
    pool.query(query, [imageUrl, location, id], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.json({ success: false, message: "Error updating data" });
        }
        else {
            console.log('Data updated successfully:', result.rows[0]);
            return res.json({ success: true });
        }
    })
})
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const query = `
        SELECT * FROM users
        WHERE username=$1
    `;
    const result = await pool.query(query, [username]);
    if (result.rows.length === 0) {
        return res.json({ success: false, message: "Invalid username" });
    }
    const user = result.rows[0];
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
        const secretKey = crypto.randomBytes(32).toString('hex');
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
        return res.json({ success: true, message: "Login successful", token: token, userId: user.id });
    }
    else {
        return res.json({ success: false, message: "Invalid password" });
    }
})
app.get('/get-profile/:id', (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT * FROM users
        WHERE id = $1
    `;
    pool.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.json({ success: false, message: "Error fetching data" });
        }
        else {
            console.log('Data fetched successfully:', result.rows[0]);
            return res.json({ success: true, data: result.rows[0] });
           
        }
    })
})
app.post('/send-email', async (req, res) => {
    const resendy = new resend.Resend(process.env.RESEND_API_KEY);
   
    try {
        const data = await resendy.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: 'deyarghadeep23@gmail.com',
            subject: 'Welcome to Dribbble',
            html: '<strong>Thank you for creating an account  on Dribbble! , Ideally this email would contain a verification link to verify your email.</strong>'
        });
        return res.json({ success: true, message: "Email sent successfully" });
    } catch (err) {
        console.log(err);
        return res.json({ success: false, message: "Error sending email" });
    }
});
app.get('/', (req, res) => {
    res.send('Hello World');
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})