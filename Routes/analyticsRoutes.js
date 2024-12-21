const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// GET: Analytics for a specific alias
router.get('/:alias', analyticsController.getAnalytics);

module.exports = router;
