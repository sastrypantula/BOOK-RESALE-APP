const express = require('express');
const { register, login, logout ,getProfile} = require('../controllers/userAuthent');
const authRouter =  express.Router();
const authMiddleware = require('../../middleware/authMiddleware');

// Register
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', authMiddleware(['buyer', 'seller']), logout);
authRouter.get('/profile', authMiddleware(['buyer', 'seller']), getProfile); // TODO: Add getprofile function

authRouter.get('/check', (req, res) => {
    if (req.user) {
        const reply = {
            Name: req.user.name,
            emailId: req.user.emailId,
            _id: req.user._id,
            role: req.user.role,
        };
        res.status(200).json({
            user: reply,
            message: "Valid User"
        });
    } else {
        res.status(200).json({
            user: null,
            message: "Not Authenticated"
        });
    }
});
module.exports = authRouter;
