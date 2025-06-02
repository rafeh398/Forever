import React from 'react'
import { useId } from "react"


function Select({ label, options, className, ...props }, ref) {
    const id = useId()

    return (
        <div className="w-full">

            {label && <label htmlFor={id} >
            </label>}   {/*yha label ha to label ko id de do jo id hm select ko dege */}

            <select className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                {...props} id={id} ref={ref}>

                    {/* options ager ha to option aye */}

               {options?.map((option) => (      
                    <option key={option} value={option}>  
                        {option}
                    </option>
                ))}
            </select>



        </div>
    )
}

export default React.forwardRef(Select)
