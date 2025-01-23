// routes/userRoutes.js
import { Router } from 'express';
import User from '../models/User.js'; // Import User model
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authenticate from '../middleware/authentication.js';
dotenv.config();
const router = Router();
const SECRET_KEY = process.env.SECRET_KEY;
// Signup route

router.post('/api/signup', async (req, res) => {

    const { username, password } = req.body;

    try {
        // Check if username already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        // Create new user

        const user = new User({ username, password });

        await user.save();



        const token = jwt.sign({ userId: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

router.post('/api/signin', async (req, res) => {

    const { username, password } = req.body;

    try {
        // Find user by username

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check password
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Respond with user data or a success message
        const token = jwt.sign({ userId: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });

    } catch (err) {
        res.status(500).json({ error: 'Failed to sign in' });
    }
});





// Protected Route
router.get('/api/home', authenticate, (req, res) => {

    res.json({ message: `Welcome ${req.user.username}!` });
});

export default router;
