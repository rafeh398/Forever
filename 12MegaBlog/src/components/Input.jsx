import React,{useId} from 'react'


//reference bna do input ka ap username password sb k liye same input le lo forwardRef use kr k


const Input= React.forwardRef(function Input({label,type="text",className="",...props},ref) {


    const id=useId();
  return(
    <div className="w-full">
        {label && <label className="inline-block mb-1 pl-1" htmlFor={id} >

        {label}
            </label>}
        <input type={type} className={`px-3 py-2 rounded-lg bg-white text-black outline-none
             focus:bg-gray-50 duration-200 border border-gray-200 
             w-full ${className} `} ref={ref} {...props} id={id}/> 
    </div>
  )
  // label or input dono mein id lgai ta k same hu label or input ki

})

export default Input
