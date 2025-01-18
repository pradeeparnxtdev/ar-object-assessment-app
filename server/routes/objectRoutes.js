const express = require('express');
const { createObject } = require('../controllers/objectController');
const router = express.Router();

router.post('/objects', createObject);

module.exports = router;
