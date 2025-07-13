const Product = require('../models/product');
const predictSurplus = require('../utils/predictSurplus');

const createProduct = async (req, res) => {
  try {
    const productData = req.body;

    // Build input for AI model
    const aiInput = {
      days_to_expiry: Math.ceil((new Date(productData.expiryDate) - new Date()) / (1000 * 3600 * 24)),
      category_encoded: getCategoryCode(productData.category),
      stock_level: productData.quantity,
      demand_score: 0.5, // TODO: dynamic based on trends or sales
    };

    const aiResult = await predictSurplus(aiInput);

    const newProduct = new Product({
      ...productData,
      discountedPrice: Math.round(productData.price * (1 - aiResult.recommended_discount / 100)),
    });

    await newProduct.save();

    res.status(201).json({ msg: 'Product added with smart pricing', product: newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Simple category mapper
const getCategoryCode = (category) => {
  const map = { Dairy: 0, Bakery: 1, Produce: 2, Frozen: 3 };
  return map[category] ?? 4;
};



// Get products by store
const getProductsByStore = async (req, res) => {
  try {
    const products = await Product.find({ storeId: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProduct,
  getProductsByStore,
  updateProduct,
  deleteProduct,
};
