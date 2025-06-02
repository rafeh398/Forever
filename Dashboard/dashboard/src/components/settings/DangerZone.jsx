import React from 'react'
import SettingSection from "./SettingsSection"
import { Trash2 } from "lucide-react"

function DangerZone() {
  return (
    <div>
        <SettingSection icon={Trash2} title={"Delete Account"} >
        <p className='text-gray-300 mb-4'>Permanently delete your account and all of your content.</p>
			<button
				className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded 
      transition duration-200'
			>
				Delete Account
			</button>

        </SettingSection>
      
    </div>
  )
}

export default DangerZone
