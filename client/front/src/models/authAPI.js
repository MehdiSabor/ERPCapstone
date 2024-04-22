// services/authService.js
const API_URL = 'http://localhost:3000/account'; // Adjust as per your server's URL

export const register = async (email, name, password) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, name, password }),
        });
        return await response.json();
    } catch (error) {
        throw new Error('Failed to register');
    }
};

export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        return await response.json();
    } catch (error) {
        throw new Error('Failed to log in');
    }
};
