// index.js



const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const productRoutes = require('./routes/product');
app.use('/api/products', productRoutes);
const dealRoutes = require('./routes/deals');
app.use('/api/deals', dealRoutes);
const qrRoutes = require('./routes/qr');
app.use('/api/qr', qrRoutes);
const charityRoutes = require('./routes/charity');
app.use('/api/charity', charityRoutes);
const impactRoutes = require('./routes/impact');
app.use('/api/impact', impactRoutes);


// DB Connection
require('./config/db')();

// Sample Route
app.get('/', (req, res) => {
  res.send('Surplus Marketplace API is running');
});

// Example Route Mounting
// const authRoutes = require('./routes/auth');
// app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
