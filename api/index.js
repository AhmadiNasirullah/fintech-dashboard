// index.js
require('dotenv').config();
const express= require('express');
const mongoose       = require('mongoose');
const cookieParser   = require('cookie-parser');
const methodOverride = require('method-override');
const path           = require('path');

const authRoutes      = require('../routes/auth');
const dashboardRoute  = require('../routes/dashboard');
const licenseRegisterRoute  = require('../routes/licenseRegisterRoute');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views')); // Look one level up for views
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../images')));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method')); // ← so ?_method=PUT/DELETE works

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser:    true,
        useUnifiedTopology: true
    })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

app.use(authRoutes);
app.use(dashboardRoute);    // /dashboard

// Now mount each under its own path:
app.use('/license-register',  licenseRegisterRoute);

app.get('/', (req, res) => {
    res.redirect('/login');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`🚀 Server listening at http://localhost:${port}`);
});
