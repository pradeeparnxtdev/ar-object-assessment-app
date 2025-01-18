const express = require('express');
const { pool } = require('./config/db');
const authController = require('./controllers/authController.js');
const objectController = require('./controllers/objectController');
const visitController = require('./controllers/visitController');
const authMiddleware = require('./middleware/authMiddleware');
const app = express();

// Middleware
app.use(express.json());

// Auth routes
app.post('/register', authController.register);
app.post('/login', authController.login);

// Object routes (auth required)
app.post('/objects', authMiddleware.verifyToken, objectController.createObject);
app.post('/visits', authMiddleware.verifyToken, visitController.storeVisit);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});