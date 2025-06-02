import React, { useState,} from 'react';
import axios from 'axios';
import { useShop } from '../context/shopContext'; // Assuming this provides the backend URL
import { toast } from 'react-toastify';

function Login() {
    const { navigate, backendURL,checkUserStatus} = useShop(); // Fetching backend URL and navigate function
    const [currentState, setCurrentState] = useState('Login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');


 


    const toggleState = () => {
        setCurrentState(currentState === 'Sign Up' ? 'Login' : 'Sign Up');
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (currentState === 'Sign Up') {
                // Handle User Registration
                const response = await axios.post(
                    `${backendURL}/api/v1/user/register`,
                    { fullName, email, password },
                    { withCredentials: true }
                );
                toast.success('User registered successfully');
                console.log(response.data);
            } else if (currentState === 'Login') {
                // Handle User Login
                const response = await axios.post(
                    `${backendURL}/api/v1/user/login`,
                    { email, password },
                    { withCredentials: true }
                );
                toast.success('Login successful');
                console.log(response.data);
                checkUserStatus()
                navigate('/'); // Redirect to homepage after successful login
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Login failed. Check credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center w-full">
            <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
                <h1 className="text-2xl font-bold mb-4">{currentState}</h1>
                <form onSubmit={onSubmitHandler}>
                    {currentState === 'Sign Up' && (
                        <div className="mb-3 min-w-72">
                            <p className="text-sm font-medium text-gray-700 mb-2">Full Name</p>
                            <input
                                onChange={(e) => setFullName(e.target.value)}
                                value={fullName}
                                className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                                type="text"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                    )}
                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                            type="email"
                            placeholder="your@gmail.com"
                            required
                        />
                    </div>
                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                            type="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
                        type="submit"
                    >
                        {currentState === 'Sign Up' ? 'Sign Up' : 'Login'}
                    </button>
                </form>
                <div className="flex w-full justify-between text-sm mt-4">
                    <p onClick={toggleState} className="cursor-pointer">
                        {currentState === 'Login' ? 'Create an account' : 'Login here'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
