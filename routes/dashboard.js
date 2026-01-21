// routes/dashboard.js
const express       = require('express');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const router         = express.Router();

// GET /dashboard
// Only accessible if authenticated and admin
router.get('/dashboard', authMiddleware, adminMiddleware, (req, res) => {
    // req.user was populated by authMiddleware
    res.render('dashboard', { username: req.user.username });
});

module.exports = router;
