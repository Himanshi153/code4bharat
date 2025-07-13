const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getImpactStats, getUserImpact } = require('../controllers/impactController');

// Admin or store-wide impact
router.get('/global', getImpactStats);

// Shopper-specific
router.get('/user', auth, getUserImpact);

module.exports = router;
