import React from 'react'

export default function Footer() {
    const list1 = ["For Designers", "Go Pro", "Explore Design work", "Design blog", "Overtime podcast", "Playoffs", "Weekly Warm-Up", "Refer a Friend", "Code of Conduct"];
    const list2 = ["Hire Designers", "Post a job opening", "Post a freelance project", "Search for designers"];
    const list3 = ["Brands", "Advertise with us"];
    const list4 = ["Company", "About", "Careers", "Support", "Media Kit", "Testimonials", "API", "Terms of Service", "Privacy policy", "Cookie policy"];
    const list5 = ["Directories", "Design jobs", "Designers for hire", "Freelance designers for hire", "Tags", "Places"];
    const list6 = ["Design assets", "Dribbble Marketplace", "Creative Market", "Fontspring", "Font Squirrel"];
    const list7 = ["Design Resources", "Freelancing", "Design Hiring", "Design Portfolio", "Design Education", "Creative Process", "Design Industry Trends"];
    return (
        <footer className="bg-gray-200/30 h-[100%] mt-auto font-inter pt-12 px-14 w-full">
            <div className="flex tablet:flex-row justify-between border-b-2  border-gray-200/70 pb-8 flex-col tablet:gap-x-4">
                <div className="flex flex-col gap-y-4">
                    <h1 className="font-header text-lg text-[#EC4899] tracking-widest">dribbble</h1>
                    <div>

                        <p className="text-sm">Discover the world's leading</p>
                        <p className="text-sm">community for creatives to share, grow,</p>
                        <p className="text-sm">and get hired.</p>
                    </div>
                    <p><ion-icon name="logo-dribbble"></ion-icon>    <ion-icon name="logo-twitter"></ion-icon>    <ion-icon name="logo-facebook"></ion-icon>    <ion-icon name="logo-instagram"></ion-icon>    <ion-icon name="logo-pinterest"></ion-icon></p>
                </div>

                <div className="mt-4 tablet:mt-0">
                    <ul>
                        {
                            list1.map((item, index) => {
                                return <li key={index} className={`text-sm mb-2 ${index == 0 ? "font-bold cursor-pointer tablet:cursor-default" : "cursor-pointer hover:text-[#EC4899] hidden tablet:block"}`}>{item}</li>
                            })
                        }
                    </ul>
                </div>
                <div>
                    <ul>
                        {
                            list2.map((item, index) => {
                                return <li key={index} className={`text-sm mb-2 ${index == 0 ? "font-bold cursor-pointer tablet:cursor-default" : "cursor-pointer hover:text-[#EC4899] hidden tablet:block"}`}>{item}</li>
                            })
                        }
                    </ul>
                    <ul className="mt-4">
                        {
                            list3.map((item, index) => {
                                return <li key={index} className={`text-sm mb-2 ${index == 0 ? "font-bold cursor-pointer tablet:cursor-default" : "cursor-pointer hover:text-[#EC4899] hidden tablet:block"}`}>{item}</li>
                            })
                        }
                    </ul>
                </div>
                <div>
                    <ul>
                        {
                            list4.map((item, index) => {
                                return <li key={index} className={`text-sm mb-2 ${index == 0 ? "font-bold cursor-pointer tablet:cursor-default" : "cursor-pointer hover:text-[#EC4899] hidden tablet:block"}`}>{item}</li>
                            })
                        }
                    </ul>
                </div>
                <div className="">
                    <ul>
                        {
                            list5.map((item, index) => {
                                return <li key={index} className={`text-sm mb-2 ${index == 0 ? "font-bold cursor-pointer tablet:cursor-default" : "cursor-pointer hover:text-[#EC4899] hidden tablet:block"}`}>{item}</li>
                            })
                        }
                    </ul>
                    <ul className="mt-4">
                        {
                            list6.map((item, index) => {
                                return <li key={index} className={`text-sm mb-2 ${index == 0 ? "font-bold cursor-pointer tablet:cursor-default" : "cursor-pointer hover:text-[#EC4899] hidden tablet:block"}`}>{item}</li>
                            })
                        }
                    </ul>
                </div>
                <div>
                    <ul>
                        {
                            list7.map((item, index) => {
                                return <li key={index} className={`text-sm mb-2 ${index == 0 ? "font-bold cursor-pointer tablet:cursor-default" : "cursor-pointer hover:text-[#EC4899] hidden tablet:block"}`}>{item}</li>
                            })
                        }
                    </ul>
                </div>

            </div>
            <div className="flex flex-row justify-between text-xs py-6 tablet:p-10 items-center gap-x-5">
                <div className="font-semibold">©️ 2024 Dribbble. All right reserved.</div>
                <div><span className="font-bold">20,501,853</span> shots dribbbled <span className="text-[#EC4899]"><ion-icon name="logo-dribbble"></ion-icon></span></div>
            </div>
        </footer>
    )
}
