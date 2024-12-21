const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

// POST: Create Short URL
router.post('/', urlController.shortenUrl);

// GET: Redirect Short URL
router.get('/:alias', urlController.redirectUrl);

module.exports = router;
