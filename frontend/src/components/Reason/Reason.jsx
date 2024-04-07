import React from 'react'
import Navbar from '../Navbar/Navbar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hire from "../../assets/hire.svg"
import Working from "../../assets/working.svg";
import Ideas from "../../assets/ideas.svg";
import Loader from '../Loader/Loader';
export default function Reason() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});
    const [select, setSelect] = useState({
        designer: false,
        hiring: false,
        looking: false
    });
    function handleSelect(mode, event) {
        setSelect({ ...select, [mode]: event.target.checked })
    }
    async function handleFinish() {
        // send a verification email to the user , so sending a post request to the backend 
        setLoader(true);
        const response = await fetch("https://aeonaxy-assignment.onrender.com/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userDetails.email
            })
        }).then((res) => res.json());
        setLoader(false);
        if (response.success) {
            navigate("/verify-mail");
        }
        else {
            navigate("/");
        }
    }
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
    const [loader, setLoader] = useState(false);
    return (
        <>
            {loader && <Loader />}
            <Navbar />
            <div className="w-full font-inter md:px-8">
                <div className="text-center w-full mt-12 sm:mt-0 mb-20">
                    <h1 className="font-extrabold text-xl md:text-3xl">What brings you to Dribbble?</h1>
                    <p className="mt-4 px-4 text-sm">Select the options that best describe you. Don't worry, you can explore other options later.</p>
                </div>

                <ul className="flex flex-col h-full items-center gap-y-16 md:flex md:flex-row md:justify-center md:gap-x-8 flex-wrap">
                    <li className="w-[290px] h-[330px]" onClick={(event) => handleSelect('designer', event)}>
                        <input type="checkbox" id="react-option" value="" className="hidden peer" required="" />
                        <label htmlFor="react-option" className="inline-flex items-center justify-between w-full p-5 bg-white border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-pink-500 peer-checked:border-pink-500 h-full">
                            <div className={`flex flex-col items-center ease-in delay-700 ${select.designer ? "top-[-40px] relative" : ""}`}>
                                <img src={Working} alt="" className="w-[80%] h-auto" />
                                <div className="w-[80%] text-base font-semibold text-center mb-2">I'm a designer looking to share my work</div>
                                {select.designer && <div className="w-full text-sm text-center">Unlock new opportunities and showcase your talent. Dribbble connects designers with clients seeking creative expertise.</div>}
                                <div>
                                    {!select.designer &&
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                        </svg>
                                    }
                                    {
                                        select.designer &&
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-check" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#EC4899" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                            <path d="M9 12l2 2l4 -4" />
                                        </svg>
                                    }
                                </div>
                            </div>
                        </label>
                    </li>
                    <li className="w-[290px] h-[330px]" onClick={(event) => handleSelect('hiring', event)}>
                        <input type="checkbox" id="flowbite-option" value="" className="hidden peer" />
                        <label htmlFor="flowbite-option" className="inline-flex items-center justify-between w-full p-5 bg-white border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-pink-500 peer-checked:border-pink-500 h-full">
                            <div className={`flex flex-col items-center justify-center ease-in delay-700 ${select.hiring ? "top-[-40px] relative" : ""}`}>
                                <img src={Hire} alt="" className="w-[80%] h-auto object-contain" />
                                <div className="w-[80%] text-base font-semibold text-center mb-2">I'm looking to hire a designer</div>
                                {select.hiring && <div className="w-full text-sm text-center">With access to a diverse pool of skilled designers, find the right candidate and bring your vision to life.</div>}
                                <div>
                                    {!select.hiring &&
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                        </svg>
                                    }
                                    {
                                        select.hiring &&
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-check" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#EC4899" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                            <path d="M9 12l2 2l4 -4" />
                                        </svg>
                                    }
                                </div>
                            </div>
                        </label>
                    </li>
                    <li className="w-[290px] h-[330px]" onClick={(event) => handleSelect('looking', event)}>
                        <input type="checkbox" id="angular-option" value="" className="hidden peer" />
                        <label htmlFor="angular-option" className="inline-flex items-center justify-between w-full p-5 bg-white border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-pink-500 peer-checked:border-pink-500 h-full">
                            <div className={`flex flex-col items-center ease-in delay-700 ${select.looking ? "top-[-40px] relative" : ""}`}>
                                <img src={Ideas} alt="" className={`w-[80%] h-auto object-contain`} />
                                <div className="w-[80%] text-base font-semibold text-center mb-2">I'm looking for design inspiration</div>
                                {select.looking && <div className="w-full text-sm text-center">With over 7 million shorts from a vast community of designers, Dribbble is the leading source for design inspiration.</div>}
                                <div className="transition ease-in delay-700">
                                    {!select.looking &&
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                        </svg>
                                    }
                                    {
                                        select.looking &&
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-check" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#EC4899" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                            <path d="M9 12l2 2l4 -4" />
                                        </svg>
                                    }
                                </div>

                            </div>
                        </label>
                    </li>
                </ul>

                <div className="w-full text-center mt-10 mb-4">
                    {(select.hiring || select.designer || select.looking) && <div className="text-center">
                        <p className="font-semibold">Anything else? You can select multiple</p>
                    </div>}
                    <div className="mt-4">
                        <button onClick={handleFinish} className="bg-[#EA4B8B] px-10 py-1 w-40 rounded-md text-white hover:bg-[#ea4b8bc4] text-sm font-medium">Finish</button>
                        {(select.hiring || select.designer || select.looking) && <p className="text-xs font-medium mt-2">or Press RETURN</p>}
                    </div>
                </div>
            </div>
        </>
    )
}
