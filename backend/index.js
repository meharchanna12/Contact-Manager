import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

const app = express();
const port = 8000;

// MongoDB URI
const mongoURI = "mongodb+srv://bt21cme086:FEBSk9oaAkvskv8H@cluster0.qf584.mongodb.net/ContactManager";

// MongoDB Connection
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/register', async (req, res) => {
    const { name, email, password, contact } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Create new user
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            contact
        });

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
