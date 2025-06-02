import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../config';
import { toast } from 'react-toastify';

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${backendUrl}/api/v1/user/admin/login`,
                { email, password },
                { withCredentials: true } // Allows browser to receive & store the cookie
            );
            if (response.data.success) {
                toast.success('Login successful');
                onLoginSuccess(); // tell App.jsx we're logged in
                setEmail("")
                setPassword("")
            }

        } catch (error) {
            toast.error(
                error?.response?.data?.message || 'Login failed. Check credentials.'
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center w-full">
            <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md ">
                <h1 className="text-2xl font-bold mb-4">AdminPanel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </p>
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
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
