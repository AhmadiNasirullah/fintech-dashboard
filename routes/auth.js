// routes/auth.js
const express = require('express');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
require('dotenv').config();

const router = express.Router();
const JWT_SECRET    = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Render the login form
// GET /login
router.get('/login', (req, res) => {
    // If a valid token cookie already exists, redirect to /dashboard
    const token = req.cookies.token;
    if (token) {
        try {
            jwt.verify(token, JWT_SECRET);
            return res.redirect('/dashboard');
        } catch {
            // If token is invalid/expired, clear it and render login below
            res.clearCookie('token');
        }
    }
    // Render login.ejs; pass no error by default
    res.render('login', { error: null });
});

// Handle login form submission
// POST /login
router.post('/login', async (req, res) => {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password) {
        return res.status(400).render('login', { error: 'Provide both fields.' });
    }

    try {
        // Find user by username OR email
        const user = await User.findOne({
            $or: [
                { email: emailOrUsername.toLowerCase().trim() },
                { username: emailOrUsername.trim() }
            ]
        });
        if (!user) {
            return res.status(400).render('login', { error: 'Invalid credentials.' });
        }

        // Compare plaintext password vs stored hash
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).render('login', { error: 'Invalid credentials.' });
        }

        // Credentials valid → sign JWT
        const payload = { id: user._id, username: user.username };
        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        });

        // Store token in an HTTP-only cookie
        // (You can add secure: true, sameSite: 'lax' if using HTTPS)
        res.cookie('token', token, {
            httpOnly: true,
            // optional: set cookie to expire with JWT, e.g. maxAge = 1hr
            maxAge: 1000 * 60 * 60
        });

        // Redirect to protected dashboard
        return res.redirect('/dashboard');
    } catch (err) {
        console.error('Error in POST /login:', err);
        return res.status(500).render('login', { error: 'Server error. Try again.' });
    }
});

// Logout: clear the cookie
// GET /logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

module.exports = router;
