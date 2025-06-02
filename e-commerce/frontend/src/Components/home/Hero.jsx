import React from 'react'
import { assets } from "../../assets/assets"

function Hero() {
    return (
        <div className="flex flex-col sm:flex-row border border-gray-400">
            {/* leftside */}
            <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
                <div className="text-[#414141]">
                    <div className="flex items-center gap-2 ">
                        <p className="bg-[#414141] w-8 md:w-11 h-[2px]"></p>
                        <p className="text-sm md:text-base font-medium "> OUT BEST SELLERS </p>

                    </div>
                    <h1 className="text-3xl lg:text-5xl py-3 leading-relaxed prata-regular">Latest Arrivals</h1>
                    <div className="flex items-center gap-2">
                        <p className="text-sm md:text-base font-semibold">SHOP NOW</p>
                        <p className="bg-[#414141] w-8 md:w-11 h-[1px]"></p>
                    </div>

                </div>


            </div>
            {/* right side */}

            <img src={assets.hero_img} alt="" className="w-full sm:w-1/2 " />


        </div>
    )
}

export default Hero
