const cartModel = require('../models/cart.model')
const validationResult = require('express-validator').validationResult

exports.getCart = async (req, res, next) => {
    if(validationResult(req).isEmpty()){
        try{
            let items = await cartModel.getItemByUser(req.session.userId)
            res.render('cart' , {
                items: items,
                isUser: true,
                validationError: req.flash('validationErrors')[0],
            })
        }catch(err) {
            console.log('get cart err :' + err)
        }
    } else{
        req.flash('validationErrors', validationResult(req).array() || "An error has occured");
        res.redirect(req.body.redirectTo)
    }
}


exports.postCart = async(req , res , next) => {
    if(validationResult(req).isEmpty()){
        try{
            await cartModel.addNewItem({
                name: req.body.name,
                price: req.body.price,
                amount: req.body.amount,
                productId: req.body.productId,
                userId: req.session.userId,
                timestamp: Date.now()
            })
            res.redirect('/cart')
        }catch(err) {
            console.log('post cart err : ' + err)
            res.redirect(req.body.redirectTo)
        }
    } else{
        req.flash('validationErrors', validationResult(req).array() || "An error has occured");
        res.redirect(req.body.redirectTo)
    }
}

exports.postSave = async (req , res ,next ) => {
    if(validationResult(req).isEmpty()){
        try{
            await cartModel.editItem(req.body._id, {amount: req.body.amount, timestamp: Date.now()})
            res.redirect('/cart')
        }catch(err) {
            console.log('post save err: ' + err)
            res.redirect('/cart')
        }
    } else{
        req.flash('validationErrors', validationResult(req).array() || "An error has occured");
        res.redirect('/cart')
    }
}

exports.postDelete = async(req, res, next) => {
    try{
        await cartModel.deleteItem(req.body._id)
        res.redirect('/cart')
    }catch(err) {
        console.log('post delet err: ' + err)
        res.redirect('/cart')
    }
}

exports.postDeleteAllItems = async(req, res, next) => {
    try{
        await cartModel.deleteAllItems()
        res.redirect('/cart')
    }catch(err) {
        console.log('post delet all items err: ' + err)
        res.redirect('/cart')
    }
}