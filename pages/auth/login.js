import React, { useState } from 'react';
import { registerUser, loginUser, getCurrentSession, logoutUser } from '@/utils/auth'; // Adjust import as necessary

const AuthComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => registerUser(email, password);
    const handleLogin = () => loginUser(email, password);
    const handleGetSession = () => getCurrentSession();
    const handleLogout = () => logoutUser();

    return (
        <div className='flex flex-col space-y-2'>
            <h1>Authentication</h1>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleGetSession}>Get Current Session</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AuthComponent;