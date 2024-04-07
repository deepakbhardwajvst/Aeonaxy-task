import React from 'react'
import MailSent from "../assets/mail_sent.png";
import Footer from '../Footer/Footer';
import NavbarMain from './NavbarMain';
import { useState, useEffect } from 'react';
export default function VerifyMail() {
    const [userDetails, setUserDetails] = useState({});
    useEffect(() => {
        const token = localStorage.getItem('token');
        const uid = localStorage.getItem('userId');
        if (!token || !uid) {
            navigate('/');
        }
        async function fetchDetails() {
            const result = await fetch(`https://aeonaxy-assignment.onrender.com/get-profile/${uid}`).then(res => res.json());
            if (result.success) {
                setUserDetails(result.data);
            } else {
                navigate('/');
            }
        }
        fetchDetails();
    }, [])
    return (
        <div>
            {/* <!-- component --> */}
            {/* <NavbarTwo /> */}
            <NavbarMain profile={userDetails.imageurl} />
            <div className="flex flex-col justify-between gap-y-24 ">
                <main className="font-inter flex flex-col items-center justify-center mt-28 w-full h-[60vh]">

                    <h1 className="text-2xl tablet:text-4xl font-bold text-gray-800">Please verify your email...</h1>
                    <img src={MailSent} alt="" className="w-24 h-24" />
                    <div className="text-center font-medium text-gray-500 flex flex-col gap-y-2 px-6 items-center">
                        <p className="mt-3">Please verify your email address. We've sent a confirmation email to:</p>
                        <p className="font-extrabold">{userDetails ? userDetails.email : "email_address"}</p>
                        <p className="">Click the confirmation link in that email to begin using Dribbble</p>
                        <p className="">Didn't receive the email? Check your Span folder, it may have been caught by a filter. If you still don't see it, you can <span className="text-pink-500 font-bold">resend the confirmation email</span></p>
                        <p className="">Wrong email address? <span className="text-pink-500 font-bold">Change it.</span></p>
                    </div>

                </main>
                <Footer />
            </div>

        </div>
    )
}
