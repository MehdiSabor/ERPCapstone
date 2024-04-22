// services/accountService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const registerUser = async (email, name, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Make sure the hashing process succeeds by checking hashedPassword
    console.log("Hashed Password:", hashedPassword, password);

    const user = await prisma.user.create({
        data: {
            Email: email,
            Name: name,
            PasswordHash: hashedPassword,
        }
    });
    
    return user;
};



const loginUser = async (email, password) => {
    try {
        const user = await prisma.user.findUnique({
            where: { Email: email }
        });

        if (!user) {
            console.log("No user found with that email");
            return { error: 'No user found with that email' };
        }
        console.log(password, user.PasswordHash);
        const isMatch = await bcrypt.compare(password, user.PasswordHash);
        if (!isMatch) {
            console.log("Password does not match");
            return { error: 'Invalid credentials' };
        }

        const token = jwt.sign({ UserID: user.UserID, Email: user.Email }, process.env.JWT_SECRET, {
            expiresIn: '2h'
        });

        return { token, user };
    } catch (error) {
        console.error('Login error:', error);
        return { error: 'Login failed due to server error' };
    }
};


const getAllUsers = async () => {
    return await prisma.user.findMany();
};

const updateUser = async (userId, updateData) => {
    return await prisma.user.update({
        where: { UserID: parseInt(userId, 10) },
        data: updateData
    });
};

const deleteUser = async (userId) => {
    return await prisma.user.delete({
        where: { UserID: parseInt(userId, 10) }
    });
};


const getUserById = async (userId) => {
    console.log(userId); // Logging the userId for debugging purposes
    try {
        // Ensure the userId is properly converted to an integer if necessary
        const user = await prisma.user.findUnique({
            where: { UserID: parseInt(userId) }
        });
        if (!user) {
            throw new Error('User not found');  // Optionally throw an error if no user is found
        }
        return user; // Return the found user
    } catch (error) {
        // Log the error and re-throw it or handle it as needed
        console.error('Error fetching user:', error);
        throw error;  // Re-throwing the error to be handled by the caller
    }
};

module.exports = { getUserById,getAllUsers, updateUser, deleteUser ,registerUser, loginUser };
