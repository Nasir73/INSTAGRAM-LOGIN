const express = require('express');
// Remove bcrypt since we won't be using it for plain text passwords
// const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Route to register a new user
router.post('/register', async(req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new user with plain text password
        user = new User({ username, password });
        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Route to log in a user
router.post('/login', async(req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare passwords in plain text (no hashing)
        if (password !== user.password) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Successful login
        res.json({ msg: 'Login successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Export the router
module.exports = router;