const Category = require('../models/category');

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate)=> {
        if(err){
            return res.status(400).json({err: "error occured"});
        }
        req.category = cate;
        next();
    });
};

exports.createCategory = (req, res) => {
    const category =  new Category(req.body);
    category.save((err, category)=>{
        if(err){
            return res.status(400).json({err:"unable to save in db"});
        }
        res.json({category});
    })
};

exports.getCategory = (req, res) => {
    return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err){
            return res.status(400).json({err: "no categories found"});
        }
        res.json(categories);
    })
};

exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err, updatedCategory) => {
        if(err){
            return res.status(400).json({err:"Failed to update"});
        }
        res.json(updatedCategory);
    });

};

exports.removeCategory = (req, res) => {
    const category = req.category;

    category.remove((err, category) => {
        if(err){
            return res.status(400).json({err:"Failed to delete"});
        }
        res.json({message: "Successfully updated."});
    })
}