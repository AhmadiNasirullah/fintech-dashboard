// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

async function seed() {
    const { MONGO_URI } = process.env;
    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    try {
        // 1. Choose credentials for your “pre-defined” user
        const username = 'admin';
        const email = 'alice@example.com';
        const plainPassword = 'MySecretPass'; // ← change this to whatever you want

        // 2. Check if that user already exists
        const existing = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (existing) {
            console.log('User already exists:', existing.username);
            await mongoose.disconnect();
            return;
        }

        // 3. Hash the password
        const saltRounds = 10;
        const hash = await bcrypt.hash(plainPassword, saltRounds);

        // 4. Create and save the new user
        const newUser = new User({
            username,
            email,
            passwordHash: hash
        });
        await newUser.save();
        console.log('✅ Seeded user:', username);
    } catch (err) {
        console.error('❌ Error seeding user:', err);
    } finally {
        await mongoose.disconnect();
    }
}

seed();
