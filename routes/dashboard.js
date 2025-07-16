// routes/dashboard.js
const express       = require('express');
const authMiddleware = require('../middleware/auth');
const router         = express.Router();

// GET /dashboard
// Only accessible if middleware.auth sees a valid JWT cookie
router.get('/dashboard', authMiddleware, (req, res) => {
    // req.user was populated by authMiddleware
    res.render('dashboard', { username: req.user.username });
});

module.exports = router;
