const cartModel = require('../models/cart.model')
const validationResult = require('express-validator').validationResult

exports.postCart = async(req , res , next) => {
    if(validationResult(req).isEmpty()){
        console.log('if')
        try{
            await cartModel.addNewItem({
                name : req.body.name,
                price : req.body.price,
                amount : req.body.amount,
                productId : req.body.productId,
                userId : req.session.userId,
                timestamp : Date.now()
            })
            res.redirect('/cart')
        }catch(err) {
            req.flash('errors', err.userMessage || "An error has occured");
            res.redirect(req.body.redirectTo)
        }
    } else{
        console.log('else')
        req.flash('validationErrors', validationResult(req).array() || "An error has occured");
        res.redirect(req.body.redirectTo)
    }
}