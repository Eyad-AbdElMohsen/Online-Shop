const orderModel = require('../models/orders.model')


exports.getOrders = async(req, res, next) => {
    try{
        let items = await orderModel.getOrdersByUser(req.session.userId)
            res.render('orders' , {
                items: items,
                isUser: true,
                isAdmin: req.session.isAdmin,
            })
    }catch(err){
        console.log('get order err :' + err)
    }
}

exports.postOrder = async(req, res, next) => {
    try{
        await orderModel.orderOneItem(req.session.userId, req.body.productId)
        res.redirect('/orders')
    }catch(err){
        console.log('post order err :' + err)
    }
}

exports.postAllOrder = async(req, res, next) => {
    try{
        await orderModel.orderAllItem(req.session.userId)
        res.redirect('/orders')
    }catch(err){
        console.log('post all orders err :' + err)
    }
}

