import React from 'react'
import Title from "../Components/common/Title"
import { assets } from "../assets/assets"

function About() {



  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'}/>

      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} alt="" className="w-full md:max-w-[450px]" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
        <p>This website is born for delivering an exceptional shopping experience, offering a wide range of high-quality products, fast delivery, secure payment options, and outstanding customer service to meet all your shopping needs.</p>
        <p>This website is born for providing easy access to premium products, excellent customer support, fast shipping, secure payments, and a seamless online shopping experience that brings convenience and satisfaction to every customer.</p>
        <b>Our Mission</b>
        <p>This website is born for providing easy access to premium products, excellent customer support, fast shipping and secure payments</p>

        </div>

      </div>
      
    </div>
  )
}

export default About
