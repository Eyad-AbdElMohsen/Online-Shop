const productModel = require('../models/products.model')
const validationResult = require('express-validator').validationResult

exports.getAdd = (req, res, next) => {
    res.render('add-product', {
        messages: req.flash('errors'),
        validationError: req.flash('validationErrors'),
        isUser: true,
        isAdmin: true,
    })
}

exports.postAdd = async(req, res, next) => {
    console.log(validationResult(req).array())
    try {
        const product = await productModel.insertNewProduct(
            req.body.name,
            req.body.price,
            req.body.description, 
            req.body.category,
            req.file.filename 
        );
    } catch (error) {
        console.error(error);
    }
}