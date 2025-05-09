// routes/order.route.js
import express from 'express';
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';

const router = express.Router();

router.post('/order', async (req, res) => {
  const { customerName, contact, address, productName, quantity } = req.body;

  try {
    // Check if the product exists
    const product = await Product.findOne({ name: productName });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if there's enough stock
    if (product.stockQuantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Create a new order with customer details
    const newOrder = new Order({
      customerName,
      address,
      contact,
      productName,
      quantity,
    });
    await newOrder.save();

    // Update the product's stock quantity
    product.stockQuantity -= quantity;
    await product.save();

    res.redirect(`/order?success=Order placed successfully!&orderId=${newOrder._id}`);
  } catch (error) {
    console.error(error);
    res.redirect('/order?error=An error occurred while placing the order.');
  }

});

export default router;
