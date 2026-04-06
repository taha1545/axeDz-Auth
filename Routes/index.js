const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const xssClean = require('xss-clean');
const hpp = require('hpp');

const { Handle, RequestContext, RequestLogger } = require('../app/Middlewares');
const Security = require('../app/Middlewares/Security');

const AuthRouter = require("./AuthRoute");
const GoogleRouter = require("./GoogleRoute");
const ContactRouter = require("./ContactRoute");

const app = express();

// Global middleware
app.disable('x-powered-by');
app.use(RequestContext);
app.use(RequestLogger);
app.use(cors(Security.corsOptions()));
app.use(helmet());
app.use(hpp());
app.use(xssClean());
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
