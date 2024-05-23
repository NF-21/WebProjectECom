const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const authenticateToken = require('../middlewares/authorization');

router.get('/userCart', authenticateToken, async (req, res) => {
    try {
        const userId = req.userData._id;

        const user = await User.findById(userId).populate('cart.productId');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.render('cartEmpty', { cart: user.cart });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
