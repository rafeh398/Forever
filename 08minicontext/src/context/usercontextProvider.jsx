import React from "react";
import userContext from "./usercontext";


const Provider= ({children})=>{
    const [user,setUser]= React.useState(null)
 return(
    
    <userContext.Provider value={{user,setUser}}>
    {children}
    </userContext.Provider>

    
 )
}
export default Provider;

// user and setuser value ee aghy pass krne k liye li