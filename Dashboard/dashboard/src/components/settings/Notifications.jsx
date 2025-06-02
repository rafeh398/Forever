import { Bell } from "lucide-react"
import React, { useState } from 'react'
import SettingSection from "./SettingsSection"
import ToggleSwitch from "./ToggleSwitch"

function Notifications() {
    const [notifications,setNotifications]=useState({
        push: true,
        email:false,
        sms:true,
    })
  return (
    <SettingSection icon={Bell} title={"Notifications"}>

        <ToggleSwitch label={" Push Notifictation"} isOn={notifications.push} 
        onToggle={()=>setNotifications({...notifications, push: !notifications.push})} />
        <ToggleSwitch label={" Email Notifictation"} isOn={notifications.email} 
        onToggle={()=>setNotifications({...notifications, email: !notifications.email})} />
        <ToggleSwitch label={" SMS Notifictation"} isOn={notifications.sms} 
        onToggle={()=>setNotifications({...notifications, sms: !notifications.sms})} />

            </SettingSection>
  )
}

export default Notifications
