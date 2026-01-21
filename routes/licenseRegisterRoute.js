const express = require('express');
const router  = express.Router();
const LicenseRegister = require('../models/licenseRegisterSchema');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

// GET /license-register - Rendered list
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const items = await LicenseRegister.find().sort({ createdAt: -1 });
        res.render('license-register/index', { items });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// GET /license-register/new - Render form
router.get('/new', authMiddleware, adminMiddleware, (req, res) => {
    res.render('license-register/new', { item: {}, error: null });
});

// GET /license-register/api - Return JSON response of all license records
// This route is **publicly accessible** and does **not require authentication**
router.get('/api', async (req, res) => {
    try {
        const items = await LicenseRegister.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});

// POST /license-register - Add new license
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
    const { nameOfEntity, licenseNumber, dateOfIssue, website } = req.body;

    if (!nameOfEntity || !licenseNumber || !dateOfIssue || !website) {
        return res.status(400).render('license-register/new', {
            item: req.body,
            error: 'All fields are required.'
        });
    }

    try {
        await new LicenseRegister({
            nameOfEntity: nameOfEntity.trim(),
            licenseNumber: licenseNumber.trim(),
            dateOfIssue: new Date(dateOfIssue),
            website: website.trim()
        }).save();
        res.redirect('/license-register');
    } catch (err) {
        const msg = err.code === 11000
            ? 'Duplicate name of entity or license number.'
            : 'Server error.';
        res.status(400).render('license-register/new', { item: req.body, error: msg });
    }
});

// GET /license-register/:id/edit - Edit license form
router.get('/:id/edit', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const doc = await LicenseRegister.findById(req.params.id);
        if (!doc) return res.status(404).send('Not found');
        res.render('license-register/edit', { item: doc, error: null });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// PUT /license-register/:id - Update license
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    const { nameOfEntity, licenseNumber, dateOfIssue, website } = req.body;

    if (!nameOfEntity || !licenseNumber || !dateOfIssue || !website) {
        const doc = await LicenseRegister.findById(req.params.id);
        return res.status(400).render('license-register/edit', {
            item: doc,
            error: 'All fields are required.'
        });
    }

    try {
        await LicenseRegister.findByIdAndUpdate(req.params.id, {
            nameOfEntity: nameOfEntity.trim(),
            licenseNumber: licenseNumber.trim(),
            dateOfIssue: new Date(dateOfIssue),
            website: website.trim()
        });
        res.redirect('/license-register');
    } catch (err) {
        const msg = err.code === 11000
            ? 'Duplicate name of entity or license number.'
            : 'Server error.';
        const doc = await LicenseRegister.findById(req.params.id);
        res.status(400).render('license-register/edit', { item: doc, error: msg });
    }
});

// DELETE /license-register/:id - Delete license
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        await LicenseRegister.findByIdAndDelete(req.params.id);
        res.redirect('/license-register');
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
