import React from 'react'

function Title({ text1, text2 }) {
  return (
    <div className="inline-flex  gap-2 mb-3  items-center ">
      <p className="text-gray-500">{text1}<span className="text-gray-700 font-medium ml-1">{text2}</span> </p>
      <p className="bg-gray-700 w-8 sm:w-12 h-[1px] sm:h-[2px]"></p>

    </div>
  )
}

export default Title
