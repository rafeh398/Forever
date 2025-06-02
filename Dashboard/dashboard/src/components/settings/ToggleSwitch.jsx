import React from 'react'

function ToggleSwitch({ label, isOn, onToggle }) {
    
    return (
        <div className="flex justify-between py-3">
            <span className="text-gray-300">
                {label}
            </span>
            <button className={`rounded-full h-5 w-11 relative focus:outline-none inline-flex items-center ${isOn? "bg-indigo-600" : "bg-gray-600"}`} onClick={onToggle}>

            <span className={` ${isOn? "translate-x-6" : "translate-x-0"} bg-white size-5 rounded-full inline-block`}></span>
            </button>

        </div>
    )
}

export default ToggleSwitch
