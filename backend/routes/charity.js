const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getAvailableSurplus,
  claimSurplusItem,
  getClaimedHistory
} = require('../controllers/charityController');

// View all unreserved, close-to-expiry items
router.get('/available', auth, getAvailableSurplus);

// Claim an item
router.post('/claim/:productId', auth, claimSurplusItem);

// Get history of claimed products
router.get('/claimed', auth, getClaimedHistory);

module.exports = router;
