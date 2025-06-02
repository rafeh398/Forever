import { useState } from "react";
import SettingSection from "./SettingsSection";
import { HelpCircle, Plus } from "lucide-react";

const ConnectedAccounts = () => {
    const [connectedAccounts, setConnectedAccounts] = useState([
        {
            id: 1,
            name: "Google",
            connected: true,
            icon: "/google.png",
        },
        {
            id: 2,
            name: "Facebook",
            connected: false,
            icon: "/facebook.svg",
        },
        {
            id: 3,
            name: "Twitter",
            connected: true,
            icon: "/x.png",
        },
    ]);

    const toggle = (id) => {
        setConnectedAccounts((prev) => (prev.map((account) => (
            account.id === id ? { ...account, connected: !account.connected } : account
        ))))


    }

    return (
        <SettingSection icon={HelpCircle} title={"Connected Accounts"}>
            {connectedAccounts.map((account) => (
                <div key={account.id} className="justify-between py-3 flex" >
                    <div className="flex gap-1">
                        <img src={account.icon} alt='Social img' className='size-6 object-cover rounded-full mr-2' />
                        <span className='text-gray-300'>{account.name}</span>
                    </div>

                    <button className={`px-3 py-1 rounded ${account.connected ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"
                        } transition duration-200`}
                        onClick={()=>toggle(account.id)}>
                        {account.connected ? "Connected" : "Connect"}
                    </button>


                </div>
            ))}

        </SettingSection>



    )
}
export default ConnectedAccounts;