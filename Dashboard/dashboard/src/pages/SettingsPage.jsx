import React from 'react'
import Header from "../components/common/Header"
import Profile from "../components/settings/Profile"
import Notifications from "../components/settings/Notifications"
import Security from "../components/settings/Security"
import DangerZone from "../components/settings/DangerZone"
import ConnectedAccounts from "../components/settings/ConnectedAccounts"

function SettingsPage() {
    return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='Settings' />
            <main>
                <Profile/>
                <Notifications/>
                <Security/>
                <ConnectedAccounts/>

                <DangerZone/>

            </main>
            </div>
  )
}

export default SettingsPage
