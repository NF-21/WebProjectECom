const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const authenticateToken = require('../middleware/authorization');

router.post('/add-to-cart', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userData._id; // `req.userData` will have user info if authenticated

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send('Invalid product ID');
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        const user = await User.findById(userId);
        const cartItem = user.cart.find(item => item.productId.toString() === productId);

        if (cartItem) {
            cartItem.quantity += 1; // Increment quantity if product already in cart
        } else {
            user.cart.push({ productId, quantity: 1 }); // Add new product to cart
        }

        await user.save();
        res.status(200).send('Product added to cart');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
