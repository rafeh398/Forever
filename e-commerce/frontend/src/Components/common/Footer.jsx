import React from 'react'
import { assets } from "../../assets/assets"

function Footer() {
    return (
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14  mt-40 text-sm ">
            <div>
                <img src={assets.logo} alt="" className="mb-5 w-32 " />
                <p className="w-full md:w-2/3 text-gray-700">Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Ducimus, velit nostrum Lorem ipsum dolor sit amet 
                    consectetur adipisicing elit. Laboriosam, deserunt natus!
                    </p>
            </div>
            <div >
                <p className="text-xl font-medium mb-5 ">COMPANY</p>
                <ul className="flex flex-col gap-1 text-gray-700">
                    <li>Home</li>
                    <li>ABout us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>

            </div>
            <div >
                <p className="text-xl font-medium mb-5 ">GET IN TOUCH</p>
                <ul className="flex flex-col gap-1 text-gray-700">
                    <li>+92-332-9938000</li>
                    <li>contactforever@gmail.com</li>
                </ul>

            </div>
            <div>
                <hr />
                <p className="py-5 text-sm text-center">Copyright 2025@ forever.com - All Right Reserves</p>
            </div>
        </div>
    )
}

export default Footer
