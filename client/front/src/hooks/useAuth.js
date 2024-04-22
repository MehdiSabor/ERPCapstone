    // hooks/useAuth.js
    import { createContext, useContext, useState, useEffect } from 'react';
    import {register, login} from '../models/authAPI';

    const AuthContext = createContext(null);

    export const AuthProvider = ({ children }) => {
        const [user, setUser] = useState(null);

        const registerUser = async (email, name, password) => {
            const result = await register(email, name, password);
            if (result.user) setUser(result.user);
            return result;
        };

        const loginUser = async (email, password) => {
            const result = await login(email, password);
            if (result.token) {
                localStorage.setItem('token', result.token);
                setUser(result.user);
            }
            return result;
        };

        const logoutUser = () => {
            localStorage.removeItem('token');
            setUser(null);
        };

        useEffect(() => {
            // Optionally implement token check here on app load
        }, []);

        return (
            <AuthContext.Provider value={{ user, registerUser, loginUser, logoutUser }}>
                {children}
            </AuthContext.Provider>
        );
    };

    export const useAuth = () => useContext(AuthContext);
