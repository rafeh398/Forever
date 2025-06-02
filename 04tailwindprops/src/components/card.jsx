import React from 'react'

function Card({username , btnText="visit me"}) {   //this is prop,  visit me is default value
    
    
    return (
        <div className="flex flex-col items-center gap-6 p-7 md:flex-row md:gap-8 rounded-2xl">
            <div>
                <img className="size-48 shadow-xl rounded-md" alt="Vite Logo" src="src/assets/react.svg" />
            </div>
            <div className="flex items-center md:items-start">
                <span className="text-2xl font-medium m-4">Class Warfare</span>{username}
                <span className="font-medium text-sky-500 ps-5">The Anti-Patterns</span>
            </div>
        </div>
    )
}

export default Card;
