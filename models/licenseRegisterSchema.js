const mongoose = require('mongoose');

const LicenseRegisterSchema = new mongoose.Schema({
    nameOfEntity: { type: String, required: true, unique: true, trim: true },
    licenseNumber: { type: String, required: true, trim: true, unique: true },
    dateOfIssue: { type: Date, required: true },
    website: {
        type: String,
        required: true,
        trim: true,
        match: [/^https?:\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/, 'Please enter a valid URL']
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LicenseRegister', LicenseRegisterSchema);
