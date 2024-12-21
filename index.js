const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./Routes/authRoutes');
const urlRoutes = require('./Routes/urlRoutes');
const analyticsRoutes = require('./Routes/analyticsRoutes');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// MongoDB Connection
const url = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@cluster1.hvniz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`
mongoose.connect(url)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


app.use('/auth', authRoutes);
app.use('/api/shorten', urlRoutes);
app.use('/api/analytics', analyticsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
