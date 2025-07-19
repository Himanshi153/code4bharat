const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createProduct,
  getProductsByStore,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Store manager routes
router.post('/', auth, createProduct);               // Add new product
router.get('/', auth, getProductsByStore);           // Get all products for logged-in manager
router.put('/:id', auth, updateProduct);             // Update product
router.delete('/:id', auth, deleteProduct);          // Delete product

module.exports = router;
