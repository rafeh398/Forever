import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        // If the page requires authentication and the user is not authenticated
        if (authentication && !authStatus) {
            navigate("/login");
        }
        // If the page doesn't require authentication and the user is authenticated
        else if (!authentication && authStatus) {
            navigate("/");
        }
    
        setLoader(false); // Stop loading after the check is done
    }, [authStatus, navigate, authentication]);
    

  return loader ? <h1>Loading...</h1> : <>{children}</>
}
