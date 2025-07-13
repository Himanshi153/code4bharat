const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { generateQRForReservation } = require('../controllers/qrController');

router.get('/:productId', auth, generateQRForReservation);

module.exports = router;
