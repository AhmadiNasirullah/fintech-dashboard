// middleware/admin.js
module.exports = function (req, res, next) {
    if (!req.user || req.user.role !== 'admin') {
        // Not admin → redirect to login
        return res.redirect('/login');
    }
    return next();
};
