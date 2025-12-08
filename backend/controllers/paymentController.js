const axios = require('axios');

const initializePayment = async (req, res) => {
  try {
    const { email, amount, ventureId } = req.body;
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      { email, amount: amount * 100, metadata: { ventureId } },
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.query;
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    );
    
    if (response.data.data.status === 'success') {
      // Update venture funding in DB
      const ventureId = response.data.data.metadata.ventureId;
      // ... update logic
      res.json({ message: 'Payment verified', ventureId });
    } else {
      res.status(400).json({ error: 'Payment failed' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { initializePayment, verifyPayment };