const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();

// Razorpay instance
const instance = new Razorpay({
  key_id: 'rzp_test_RQSqpXM9R7eM5e',
  key_secret: '2cOH4tOCfdQDHVlpSVyWLKpn'
});

// Create Order Route
router.post('/create-order', async (req, res) => {
  const { amount, currency, receipt } = req.body;

  const options = {
    amount: amount * 100, // Amount in paise
    currency,
    receipt,
    payment_capture: 1
  };

  try {
    const order = await instance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.log('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Verify Payment Signature
router.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', 'YOUR_KEY_SECRET')
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    res.json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'failure' });
  }
});

module.exports = router;
