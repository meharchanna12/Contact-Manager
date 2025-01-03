import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Contact from './models/Contact.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 8002;
const secret = process.env.SECRET;

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        req.user = { id: user.id, email: user.email };
        next();
    });
}

app.post('/register', async (req, res) => {
    const { name, email, password, contact } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

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

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDoc = await User.findOne({ email });
        if (!userDoc) {
            return res.status(400).json({ message: "User not found" });
        }
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (!passOk) {
            return res.status(400).json({ message: "Invalid password" });
        } else {
            const token = jwt.sign({ id: userDoc._id, email }, secret);
            res.status(200).json({ token,
                user: {
                    id: userDoc._id,
                    name: userDoc.name,
                    email: userDoc.email,
                    contact: userDoc.contact // Include contact if needed
                }
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/profile', authenticateToken, async (req, res) => {
    const { name, email, phone, type } = req.body;
    try {
        const newContact = { name, email, phone, type, user: req.user.id };
        const contactDoc = await Contact.create(newContact);
        res.status(201).json(contactDoc);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/profile', authenticateToken, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id });
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.put('/profile/:id',authenticateToken,async (req,res)=>{
    const {name,email,phone,type} = req.body;
    try{
        const contact = await Contact.findById(req.params.id);
        if(!contact){
            return res.status(404).json({message:"Contact not found"});
        }
        if(contact.user.toString() !== req.user.id){
            return res.status(403).json({message:"Unauthorized"});
        }
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
        contact.type = type;

        await contact.save();
        res.status(200).json(contact);
    
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
})
app.delete('/profile/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid contact ID" });
    }

    try {
        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        if (contact.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Delete the document
        await Contact.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Contact deleted" });
    } catch (err) {
        console.error("Error deleting contact:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
