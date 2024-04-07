import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import Loader from '../Loader/Loader';
export default function CreateProfile() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [userId, setUserId] = useState(null);
    const [location, setLocation] = useState("");
    const [loader, setLoader] = useState(false);
    function handleLocation(event) {
        setLocation(event.target.value);
    }
    function handlePictureChange(event) {

        if (event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }
    function handleChooseImageClick() {
        document.getElementById('fileInput').click();
    }
    async function handleSubmit() {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "arghaCloud");
        data.append("cloud_name", "dnfmbxrli");
        setLoader(true);
        await fetch("https://api.cloudinary.com/v1_1/dnfmbxrli/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(
                async (data) => {
                    await fetch(`https://aeonaxy-assignment.onrender.com/create-profile/${userId}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            imageUrl: data.url,
                            location: location
                        })
                    })
                        .then(res => res.json())
                        .then(
                            (data) => {
                                setLoader(false);
                                if (data.success) {
                                    navigate("/reason");
                                }
                                else {
                                    console.log("Error creating profile");
                                }
                            }
                        )
                        .catch((err) => { setLoader(false); console.log(err) })
                }
            )
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        const uid = localStorage.getItem('userId');
        if (!token || !uid) {
            navigate('/')
        }
        else {
            setUserId(uid);
        }
    })
    return (
        <>
            {loader && <Loader />}
            <Navbar />
            <div className="px-[10vw] sm:pl-[18vw] md:pl-[20vw] laptop:pl-[30vw] sm:pt-[4vh] laptop:pt-[2vh]">
                <div className=" pt-7">
                    <h1 className="font-inter font-extrabold text-2xl md:text-3xl">Welcome! Let's create your profile</h1>
                    <p className="mt-5 font-inter">Let others get to know you better! You can do these later</p>
                </div>
                <div className="mt-10 font-inter">
                    <p className="font-bold font-inter text-lg mb-4">Add an avatar</p>
                    <div className="flex flex-row gap-8">
                        {image ? <img src={URL.createObjectURL(image)} alt="profilePhoto" className="rounded-full object-fit w-32 h-34" /> : <div className="border-dashed border-2 border-slate-300 p-12 rounded-full"><FontAwesomeIcon icon={faCamera} /></div>}
                        <div className="pt-3">
                            <div className="border-2 px-2 py-2 rounded-md font-bold text-xs w-28 cursor-pointer text-center" onClick={handleChooseImageClick}><input id="fileInput" type="file" hidden onChange={handlePictureChange} />Choose Image</div>
                            <div className="text-slate-400 font-bold text-xs sm:text-sm mt-5 cursor-pointer">&gt; Or choose one of our defaults</div>
                        </div>
                    </div>
                </div>
                <div className="mt-16">
                    <p className="font-bold font-inter text-lg mb-4">Add your location</p>
                    <div className="mt-6">
                        <input type="text" value={location} onChange={handleLocation} placeholder="Enter a location" className="w-[80%] lg:w-[60%] border-b-2 focus:outline-none font-medium" />
                    </div>
                </div>
                <div className="mt-8 sm:mt-14 pb-8">
                    <button className="bg-[#EA4B8B] px-10 py-1 w-40 rounded-md text-white hover:bg-[#ea4b8bc4]" onClick={handleSubmit}>Next</button>
                </div>
            </div>
        </>
    )
}
