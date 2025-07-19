const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.post('/api/products', async (req, res) => {
  try {
    const { stock_level, days_to_expiry, avg_daily_sales, item_category } = req.body;

    // Call FastAPI
    const response = await axios.post('http://127.0.0.1:8000/predict', {
      stock_level,
      days_to_expiry,
      avg_daily_sales,
      item_category
    });

    const { probability_unsold, discount_percent } = response.data;

    res.json({
      success: true,
      probability_unsold,
      discount_percent,
      message: `Discount suggested: ${discount_percent}%`
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});


app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
