const productModel = require('../models/products.model')
const orderModel = require('../models/orders.model')
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
        res.redirect('/')
    } catch (error) {
        console.error(error);
    }
}

exports.getOrders = async(req, res, next) => {
    try{
        let items = await orderModel.getAllOrders();
        res.render('manage-order', {
            items: items,
            isUser: true,
            isAdmin: true,
        })
    }catch (error) {
        console.error(error);
    }
}

exports.postOrders = async(req, res, next) => {
    try {
        await orderModel.editOrderById(req.body.userId, {status: req.body.status})
        res.redirect('/admin/orders')
    } catch (error) {
        console.error(error);
    }
}