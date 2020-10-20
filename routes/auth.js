var express = require('express')
var router = express.Router();
const {check} = require('express-validator');
const {signout, signup, signin, isSignedIn} = require("../controllers/auth");

router.post('/signup',
[check("name").isLength({min:3}).withMessage("must be atleast 3 char"),         // validation before storing
check("email").isEmail().withMessage("email is required"),
check("password").isLength({min:3}).withMessage("must be atleast 3 char"),
],signup);

router.post('/signin',[
check("email").isEmail().withMessage("email is required"),
check("password").isLength({min:1}).withMessage("password required"),
],signin);


router.get('/signout',signout);



module.exports = router;