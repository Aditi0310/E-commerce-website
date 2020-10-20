const User = require('../models/user');
const Order = require('../models/order');

exports.getUserById = (req, res, next, id) => {
    console.log('aditi');
    User.findById(id).exec((err, user)=> {
        if(err || !user){
            return res.status(400).json({err : "no user is found in db"});
        }
        console.log('hello', user);
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;       // so that the salt and user is not shown in the browser.
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new: true, useFindAndModify: false},
        (err, user) => {
            if(err){
                return res.status(400).json({err: " you are not authorised"});
            }
            user.salt = undefined;       // as we take user here so user.salt.
            user.encry_password = undefined;
            res.json(user);
        }
    )
};

exports.userPurchaseList = (req, res) => {
    Order.find({ user : req.profile._id}).populate("user", "_id name")      // populate is use when there is a cross connection between models
        .exec((err, order) => {
            if(err){
                return res.status(400).json({err: "no order found"});
            }
            res.json(order);
        });
};

exports.pushOrderPurchaseList = (req, res, next) => {
    let purchases= []
    req.body.order.products.forEach( product => {
        purchases.push({
            _id : product._id,
            name : product.name,
            description: product.description,
            category : product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id,
        });

        User.findOneAndUpdate(
            {_id: req.profile.id},
            {$push: {purchases: purchases}},
            {new: true},
            (err, purchases) => {
                if(err){
                    return res.status(400).json({
                        err: "unable to save purchase list"
                    })
                }
                next();
            }
        )
    })
}
