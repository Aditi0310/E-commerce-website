const User = require('../models/user');
const {check, validationResult} = require('express-validator');
var jwt = require('jsonwebtoken');              // token- to put in user browser that he/she is authenticated and logged in
var expressJwt = require('express-jwt');



exports.signup = (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ error: errors.array()[0].msg});
    }
    const user = new User(req.body)
    user.save((err , user) => {
        if(err){
            return res.status(400).json({ err : "Not able to save"})
        }
        res.json({
            name: user.name,
            email: user.email,
            id : user._id
        });
    })
};

exports.signin = (req, res) => {
    const {email, password} = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ error: errors.array()[0].msg});
    }

    User.findOne({email}, (err, user) => {                  // find by email, if email found then check for password
        if(err || !user){
            res.status(400).json({err: "user not found"})
        }

        if(!user.autheticate(password)){                      // check for password match
            res.status(401).json({err: "error and password not match"})
        }

        //create token
        const token = jwt.sign({_id: user._id}, 'ADITI')

        //put token into users cookie
        res.cookie("token",token, {expire: new Date()+ 9999});

        //send response to frontend
        const {_id, name , email , role} = user;
        return res.json({ token, user:{_id, name , email , role}});
    })
};

exports.signout = function(req, res){
    res.clearCookie("token");
    res.json({message:"user sign out"});
};


//protected routes( islogggedin- we can see others profile and do a lot of stuff, isauthenticated- ewhen we want to change our profile picture, we cannot change the profile pictures of other people)
exports.isSignedIn = expressJwt({
    secret : 'ADITI',
    userProperty:"auth"
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
    console.log(req.profile,'shfjh',req.auth); 
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
      return res.status(403).json({
        error: "ACCESS DENIED"
      });
    }
    next();
  };
  
  exports.isAdmin = (req, res, next) => {
      console.log(req, 'aditi');
    if (req.profile.role === 0) {
      return res.status(403).json({
        error: "You are not ADMIN, Access denied"
      });
    }

    next();
  };
  