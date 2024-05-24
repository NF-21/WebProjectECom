const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Product = require('../models/products.model');
const mongoose = require('mongoose');
const authenticateToken = require('../middlewares/authorization');
console.log("addToCart.js")
router.post('/add-to-cart', authenticateToken, async (req, res) => {
    console.log("addToCart.js")
    try {
        const { productId } = req.body;
        const userId = req.userData.id;

        console.log('User ID:', userId);
        console.log('Product ID:', productId);

        

        const product = await Product.findOne({productID:productId});
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItem = user.cart.find(item => item.productId.toString() === productId);

        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            user.cart.push({ productId, quantity: 1 });
        }

        await user.save();
        res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;