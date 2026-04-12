const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const hpp = require('hpp');
//
const { Handle, RequestLogger } = require('../app/Middlewares');
//
const AuthRouter = require("./AuthRoute");
const GoogleRouter = require("./GoogleRoute");
const ContactRouter = require("./ContactRoute");

const app = express();

// Global middleware
app.disable('x-powered-by');
app.use(RequestLogger);
app.use(helmet());
app.use(hpp());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '../public')));

// Routes
app.use('/auth', AuthRouter);
app.use('/auth', GoogleRouter);
app.use('/contacts', ContactRouter);

//
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to AXEDZ auth service' });
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'No endpoint found for this request',
        path: req.originalUrl,
    });
});

// Error handler
app.use(Handle);

module.exports = app;
