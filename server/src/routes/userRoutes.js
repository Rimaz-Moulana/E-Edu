const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

router.get('/profile', authMiddleware.authenticateUser, (req, res) => {
    // Here you can access the authenticated user's data through req.user
    res.json({ user: req.user });
});
router.get('/getUser/:email', userController.getUserByEmail);


module.exports = router;