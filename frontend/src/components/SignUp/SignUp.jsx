import React from 'react'
import CreatorSVG from "../../assets/creators.svg";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loader from '../Loader/Loader';
export default function SignUp() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });
    const [usernameError, setUserNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    function handleChange(identifier, event) {
        if (identifier === 'username') {
            setUserNameError(false);
        }
        if (identifier === 'email') {
            setEmailError(false);
        }
        if (identifier === 'password') {
            setPasswordError(false);
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            [identifier]: event.target.value
        }))
    }
    async function handleSubmit(event) {
        event.preventDefault();
        if (formData.password.length < 6) {
            setPasswordError(true);
            return;
        }
        console.log(formData);
        try {
            setLoading(true);
            const response = await fetch('https://aeonaxy-assignment.onrender.com/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json();
            setLoading(false);
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                navigate('/create-profile');
            }
            else if (!data.success) {
                if (data.message === 'username already taken') {
                    setUserNameError(true);
                }
                else if (data.message === 'email already taken') {
                    setEmailError(true);
                }
                else {
                    alert(data.message);
                }
            }
        }
        catch (error) {
            console.log(error);
            alert("Error signing up. Please try again.");
            return;
        }
    }
    return (
        <>
            {loading && <Loader />}
            <div className="flex h-screen">
                <div className="hidden md:block h-full bg-yellow-500/45 px-14 w-[400px] tablet:w-[600px]">
                    <div className="flex flex-col justify-evenly h-auto pt-16 gap-y-14">
                        <div>
                            <h1 className="font-header mb-5 text-lg text-yellow-700/80 tracking-widest">dribbble</h1>
                            <h1 className="text-xl font-extrabold text-yellow-900/80 font-inter">Discover the world's top Designers and Creatives.</h1>
                        </div>
                        <img src={CreatorSVG} alt="creator" />
                        <div>
                            <p className="text-yellow-900/90">Art by <span className="underline"><a href="#" >Peter Tarka</a></span></p>
                        </div>
                    </div>
                </div>
                <div className="h-full pt-3 w-full overflow-auto">
                    <div className="flex flex-row justify-end w-full pr-5">
                        <p className="font-medium">Already a member? <span><a href="#" className="text-[#816391]">Sign In</a></span></p>
                    </div>
                    <div className="flex flex-col items-center gap-2.5 w-full">

                        <div className="w-[344px] sm:w-[524px] md:w-[424px] pt-8">
                            <h1 className="font-bold text-2xl">Sign up to Dribbble</h1>
                        </div>

                        {/* form validation sentence */}
                        {usernameError && <p className="font-medium text-red-500 w-[344px] sm:w-[524px] md:w-[424px]"> &bull; Username already taken</p>}
                        {emailError && <p className="font-medium text-red-500 w-[344px] sm:w-[524px] md:w-[424px]"> &bull; Email already taken</p>}
                        {passwordError && <p className="font-medium text-red-500 w-[344px] sm:w-[524px] md:w-[424px]"> &bull; Password should contain at least 6 letters</p>}
                        {/* form validation sentence */}
                        <div className="flex flex-col items-center pt-12">
                            <form action="" className="flex flex-col gap-10" onSubmit={handleSubmit}>
                                <div className="flex flex-row justify-center gap-6">
                                    <div className="flex flex-col">
                                        <label htmlFor="name" className="text-bold">Name</label>
                                        <input type="text" id="name" required onChange={(event) => handleChange('name', event)} className="bg-slate-200 px-2 py-1 rounded-md text-sm font-medium w-[160px] sm:w-[250px] md:w-[200px]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="username" className="text-bold">Username</label>
                                        <input type="text" id="username" required onChange={(event) => handleChange('username', event)} className="bg-slate-200 px-2 py-1 text-sm font-medium rounded-md w-[160px] sm:w-[250px] md:w-[200px]" />
                                    </div>
                                </div>
                                <div className="flex flex-row justify-center">
                                    <div className="flex flex-col w-[344px] sm:w-[524px] md:w-[424px]">
                                        <label htmlFor="email" className="text-bold ">Email</label>
                                        <input type="text" id="email" required onChange={(event) => handleChange('email', event)} className="bg-slate-200 px-2 py-1 text-sm font-medium rounded-md" />
                                    </div>
                                </div>
                                <div className="flex flex-row justify-center">
                                    <div className="flex flex-col w-[344px] sm:w-[524px] md:w-[424px]">
                                        <label htmlFor="password" className="text-bold">Password</label>
                                        <input type="password" id="password" required onChange={(event) => handleChange('password', event)} className="bg-slate-200 px-2 py-1 text-sm font-medium rounded-md" placeholder="6+ characters" />
                                    </div>
                                </div>
                                <div className="flex flex-row justify-center">
                                    <div className="flex flex-row w-[344px] sm:w-[524px] md:w-[424px]" >
                                        <input type="checkbox" id="pp" className="mr-2 w-8 h-8 rounded-none border-none" required />
                                        <label htmlFor="pp" className="text-sm">Creating an account means you're okay with our <span className="text-[#b271d4] font-medium"><a href="">Terms of Service</a></span>,<span className="text-[#b271d4] font-medium"><a href="">Privacy Policy</a></span>, and our default <span className="text-[#b271d4] font-medium"><a href="">Notification Settings.</a></span></label>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <button className="bg-[#EA4B8B] px-10 py-1 rounded-md text-white hover:bg-[#ea4b8bc4]">Create Account</button>
                                    </div>
                                    <div className="w-[300px] sm:w-[450px] md:w-[400px] pt-4">
                                        <p className="text-slate-500 text-xs">This site is protected by reCAPTCHA and the Google <span className="text-[#b271d4] font-medium"><a href="">Privacy Policy</a></span> and <span className="text-[#b271d4] font-medium"><a href="">Terms of Service</a></span> apply.</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}