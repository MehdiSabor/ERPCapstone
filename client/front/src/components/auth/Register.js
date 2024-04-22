// components/Register.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../models/authAPI'; // Ensure this import path is correct

const Register = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.error);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const result = await register(email, name, password);
            if (result.user) {
                dispatch({ type: 'SET_USER', payload: { user: result.user, token: result.token } });
                // Redirect or handle success
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'Registration failed' });
            }
        } catch (error) {
            console.error('Registration failed:', error);
            dispatch({ type: 'SET_ERROR', payload: 'Registration error' });
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Register</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Register;
