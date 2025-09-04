const User = require('../models/User-model');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = await User.create(req.body); // password hashed by pre-save hook

        const token = jwt.sign(
            { _id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ success: 'User registered successfully', token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}


async function loginUser(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email }).select('+password');
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isPasswordCorrect = await user.isCorrectPassword(req.body.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ success: 'User logged in successfully', token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
};
