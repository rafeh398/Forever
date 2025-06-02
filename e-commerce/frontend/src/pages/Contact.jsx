import React from 'react'
import Title from "../Components/common/Title"
import { assets } from "../assets/assets"
import NewsLetter from "../Components/home/NewsLetter"

function Contact() {



  return (
    <>
    <div className="text-center text-2xl pt-10 border-t">
      <Title text1={'CONTACT'} text2={'US'}/>
      
    </div>
    <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
      <img src={assets.contact_img} alt="" className="w-full md:max-w-[480px]" />
      <div className="flex flex-col justify-center items-start gap-6">
        <p className="font-semibold text-xl text-gray-600 ">Our Store</p>
        <p className="text-gray-500">85412 Hill Station <br /> Suite 350, Washington, USA</p>
        <p className="text-gray-500">Tel : (415) 555-01325 <br /> Email : admin56@gmail.com </p>
        <p className="font-semibold text-xl text-gray-600">Careers at Forever</p>
        <p className="text-gray-500">Learn more about our teams and job openings.</p>
        <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 ">Explore Jobs</button>
      </div>

    </div>
    <NewsLetter/>
    </>
  )
}

export default Contact
