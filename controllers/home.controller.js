const productsModel = require("../models/products.model")

exports.getHome = (req , res , next) => {
    let category = req.query.category;
    let productsPromise;
    if(!category || category == 'all') productsPromise = productsModel.getAllProducts() 
    else productsPromise = productsModel.getAllProductsByCategory(category)
    productsPromise.then( products => {
        res.render('index',{
            category : category || 'all',
            products : products,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            validationError: req.flash('validationErrors')[0],
        })
    })
}