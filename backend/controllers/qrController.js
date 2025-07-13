const QRCode = require('qrcode');
const Product = require('../models/product');

const generateQRForReservation = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    if (!product.reserved || product.reservedBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized access' });
    }

    // Info to encode in QR
    const qrData = {
      productId: product._id,
      reservedBy: req.user.id,
      reservedAt: new Date().toISOString(),
    };

    const qrString = JSON.stringify(qrData);

    QRCode.toDataURL(qrString, (err, url) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ qrCode: url }); // this is a base64 PNG image
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { generateQRForReservation };
