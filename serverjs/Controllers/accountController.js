// controllers/accountController.js
const accountService = require('../Services/accountService');

const register = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const user = await accountService.registerUser(email, name, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error registering user.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await accountService.loginUser(email, password);
        if (result) {
            res.json(result);
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user.' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await accountService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

const updateUser = async (req, res) => {
    const { userId } = req.params;
    const updateData = req.body;
    try {
        const updatedUser = await accountService.updateUser(userId, updateData);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};

const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        await accountService.deleteUser(userId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await accountService.getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user.', error });
    }
};

module.exports = { register,getUser,getAllUsers, updateUser, deleteUser, login };
