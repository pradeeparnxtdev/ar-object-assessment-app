const express = require('express');
const { createVisit } = require('../controllers/visitController');
const router = express.Router();

router.post('/visits', createVisit);

module.exports = router;
