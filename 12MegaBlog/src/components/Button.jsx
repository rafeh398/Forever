import React from 'react'


// mix kr k classes ap function k andr as variable de k call kr skty

function Button({children, type ="button", bgColor="bg-blue-600", textColor="text-white", className="",...props}) {
  return (
   
      <button className={`px-4 py-2 rounded-lg  ${bgColor} ${textColor} ${className}}`}{...props}> 
      {/* //props means additional cheeze jo user de */}
        {children}
      </button>
   
  )
}

export default Button
