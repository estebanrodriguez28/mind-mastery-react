// routes/userRoutes.js
import { Router } from 'express';
import Thought from '../models/Thoughts.js'; // Import User model
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authenticate from '../middleware/authentication.js';
dotenv.config();
const router2 = Router();
const SECRET_KEY = process.env.SECRET_KEY;
// Signup route


router2.post('/api/thoughts', authenticate, async (req, res) => {
    const { text } = req.body;

    try {
        // Create and save a new note
        const thought = new Thought({
            userId: req.user.userId, // Attach userId from JWT payload
            text,
        });
        await thought.save();

        res.status(201).json({ message: 'Note created', note: thought });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create thought' });
    }
});

router2.get('/api/thoughts', authenticate, async (req, res) => {
    try {
        // Fetch notes associated with the authenticated user
        const thoughts = await Thought.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.status(200).json({ thoughts: thoughts });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch thoughts' });
    }
});




export default router2;
