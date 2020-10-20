const express = require('express');
const router = express.Router();

const{isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');
const{getUserById, getUser, updateUser, userPurchaseList} = require('../controllers/user');

router.param("userID", getUserById);

router.get('/user/:userID', isSignedIn, isAuthenticated, getUser);
router.put('/user/:userID', isSignedIn, isAuthenticated, updateUser);
router.get('/order/user/:userID', isSignedIn, isAuthenticated, userPurchaseList);

module.exports = router;