import React from 'react'
import { useLoaderData } from "react-router-dom"


function Github() {

    const data=useLoaderData()

    return (
        <div className="bg-gray-700 text-white m-4 p-4">
            github followers : {data.followers}

        </div>
    )
}


export default Github

 export  const githubinfo= async ()=>{
    const response= await fetch('https://api.github.com/users/hiteshchoudhary')
        return  response.json()
}
