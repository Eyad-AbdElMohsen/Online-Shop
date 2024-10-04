const productModel = require('../models/products.model')
const orderModel = require('../models/orders.model')
const validationResult = require('express-validator').validationResult

exports.getAdd = (req, res, next) => {
    res.render('add-product', {
        messages: req.flash('errors'),
        validationError: req.flash('validationErrors'),
        isUser: true,
        isAdmin: true,
        pageTitle: 'Add Product'
    })
}

exports.postAdd = async(req, res, next) => {
    if(validationResult(req).isEmpty()){
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
            res.redirect('/error')
        }
    }else{
        req.flash('validationErrors', validationResult(req).array() || "An error has occured");
        res.redirect("/admin/add")
    }
}

exports.getOrders = async(req, res, next) => {
    try{
        let items = await orderModel.getAllOrders();
        res.render('manage-order', {
            items: items,
            isUser: true,
            isAdmin: true,
            pageTitle: 'Manage Orders'
        })
    }catch (error) {
        res.redirect('/error')
    }
}

exports.postOrders = async(req, res, next) => {
    try {
        await orderModel.editOrderById(req.body.userId, {status: req.body.status})
        res.redirect('/admin/orders')
    } catch (error) {
        res.redirect('/error')
    }
}