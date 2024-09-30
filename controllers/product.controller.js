const productsModel = require('../models/products.model')

exports.getProduct = (req , res , next) => {
    // get id
    // get products
    // render
    let id = req.params.id;
    productsModel.getProductById(id).then((product) => {
        res.render('product' ,  {
            product : product,
            isUser: true,
            isAdmin: req.session.isAdmin,
            validationError: req.flash('validationErrors')[0],
        })
    })
}
