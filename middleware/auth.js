// middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
    // Read the token from cookie “token”
    const token = req.cookies.token;
    if (!token) {
        // No token → redirect to login
        return res.redirect('/login');
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        // Attach user info to req.user
        req.user = {
            id: decoded.id,
            username: decoded.username,
            role: decoded.role
        };
        return next();
    } catch (err) {
        // Invalid or expired token → clear cookie & redirect to login
        res.clearCookie('token');
        return res.redirect('/login');
    }
};
