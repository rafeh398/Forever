import { Lock} from "lucide-react"
import React, { useState } from 'react'
import SettingSection from "./SettingsSection"
import ToggleSwitch from "./ToggleSwitch"

function Security() {
    const [twoFactor,setTwoFactor]=useState({
        authentication: true,
       
    })
  return (
    <SettingSection icon={Lock} title={"Security"}>

        <ToggleSwitch label={" Two-factor Authentication"} isOn={twoFactor.authentication} 
        onToggle={()=>setTwoFactor({authentication: !twoFactor.authentication})} />
         <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto'>
			Change Password
			</button>

    

            </SettingSection>
  )
}

export default Security
