// routes/userRoutes.js
import { Router } from 'express';
import Thought from '../models/Thoughts.js'; // Import User model
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authenticate from '../middleware/authentication.js';
import OpenAI from 'openai';


dotenv.config();
const router2 = Router();
const SECRET_KEY = process.env.SECRET_KEY;




router2.post('/api/thoughts', authenticate, async (req, res) => {
    const { title, p_thought, n_thought } = req.body;

    try {
        // Create and save a new note
        const thought = new Thought({
            userId: req.user.userId, // Attach userId from JWT payload
            title,
            p_thought,
            n_thought
        });
        await thought.save();

        res.status(201).json({ message: 'Thought created', note: thought });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create thought' });
    }
});

router2.get('/api/thoughts', authenticate, async (req, res) => {
    try {

        const thoughts = await Thought.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.status(200).json({ thoughts: thoughts });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch thoughts' });
    }
});

router2.get('/api/thought', async (req, res) => {
    const { thoughtId } = req.query;
    try {

        if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
            return res.status(400).json({ error: 'Invalid thought ID format' });
        }
        const thought = await Thought.findById(thoughtId);

        res.status(200).json({ thought: thought });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch thought' });
    }
});


router2.put('/update/thought', async (req, res) => {
    const { thoughtId, title, p_thought, n_thought } = req.body;
    try {

        const thought = await Thought.findByIdAndUpdate(
            thoughtId,
            { title, p_thought, n_thought }
        );
        res.status(200).json({ thought: thought });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update thought' });
    }
});

router2.delete('/delete/:id', async (req, res) => {


    try {
        const thoughtId = req.params.id;

        // Validate if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
            return res.status(400).json({ message: "Invalid thought ID" });
        }

        // Find and delete the user by ID
        const deletedThought = await Thought.findByIdAndDelete(thoughtId);

        if (!deletedThought) {
            return res.status(404).json({ message: "Thought not found" });
        }

        res.json({ message: "Thought deleted successfully", thought: deletedThought });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});




// UPDATE opacity value
router2.put('/opacity', async (req, res) => {
    try {
        const { thoughtId, n_opacity, p_opacity } = req.body; // New opacity from frontend

        const thought = await Thought.findByIdAndUpdate(
            thoughtId,
            { n_opacity, p_opacity }
        );
        res.status(200).json({ thought: thought });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});


router2.put('/positive', async (req, res) => {
    try {
        const { thoughtId, isPositive } = req.body; // New opacity from frontend

        const thought = await Thought.findByIdAndUpdate(
            thoughtId,
            { isPositive }
        );
        res.status(200).json({ thought: thought });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});


router2.post('/api/ai', async (req, res) => {
    try {


        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
        });

        // Get input text from request body
        const { inputText } = req.body;

        if (!inputText) {
            return res.status(400).json({ error: 'Input text is required' });
        }

        // Get chat completion from OpenAI

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": "You are a mental health assistant helping user convert negative thoughts into positive ones. User will give you the description of their negative thought, you help me them change into something positive and empowering that helps them. Responses should be in brief a sentence to two max, avoid using any markdown symbol" },
                { "role": "user", "content": `Help me makes this negative thought positive to improve my wellbeing: "${inputText}"` }
            ]
        });



        // Return analysis and image URL
        res.json({
            ai_thought:
                completion.choices[0].message.content
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});





export default router2;
