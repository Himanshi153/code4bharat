const Product = require('../models/product');

// Show surplus items: unreserved + expiring in 1–2 days
const getAvailableSurplus = async (req, res) => {
  try {
    const now = new Date();
    const cutoff = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days ahead

    const products = await Product.find({
      reserved: false,
      expiryDate: { $lte: cutoff, $gte: now }
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Claim an item
const claimSurplusItem = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product || product.reserved) {
      return res.status(400).json({ msg: 'Item unavailable or already claimed' });
    }

    product.reserved = true;
    product.reservedBy = req.user.id;
    await product.save();

    res.json({ msg: 'Surplus item claimed!', productId: product._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View claimed products by this charity
const getClaimedHistory = async (req, res) => {
  try {
    const products = await Product.find({
      reservedBy: req.user.id
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAvailableSurplus,
  claimSurplusItem,
  getClaimedHistory
};
