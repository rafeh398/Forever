import React from 'react'

function NewsLetter() {
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
  return (
    <div className="text-center mt-12 ">
      <p className="text-2xl text-gray-700 font-medium">Subscribe now and get 20% off</p>
      <p className="text-gray-400 mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea.</p>
      <form className="w-full sm:w-1/2 items-center gap-3 mx-auto my-6 pl-3 
      border border-gray-400 flex flex-row" onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter Email..." required className="w-full sm:flex-1 outline-none "/>
        <button className="bg-gray-700 text-white text-xs px-3 py-2 sm:px-10 sm:py-4 " type="submit">SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsLetter
