const Product = require('../models/product');

// Admin/stats dashboard (global impact)
const getImpactStats = async (req, res) => {
  try {
    const claimed = await Product.find({ reserved: true });

    const totalItems = claimed.length;
    const mealsDonated = totalItems; // 1 item = 1 meal
    const co2Saved = mealsDonated * 2.5; // in kg

    res.json({
      surplusRescued: totalItems,
      mealsDonated,
      co2SavedKg: co2Saved.toFixed(1)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Shopper-specific dashboard
const getUserImpact = async (req, res) => {
  try {
    const userId = req.user.id;

    const claimedByUser = await Product.find({ reservedBy: userId });

    const total = claimedByUser.length;
    const co2Saved = total * 2.5;

    res.json({
      itemsClaimed: total,
      mealsDonated: total,
      co2SavedKg: co2Saved.toFixed(1)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getImpactStats,
  getUserImpact
};
