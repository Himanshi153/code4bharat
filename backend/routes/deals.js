const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
  getFlashDeals,
  reserveDeal
} = require('../controllers/dealController');

router.get('/', auth, getFlashDeals);           // ✅ must be a function
router.post('/reserve/:id', auth, reserveDeal); // ✅ must be a function

module.exports = router;


