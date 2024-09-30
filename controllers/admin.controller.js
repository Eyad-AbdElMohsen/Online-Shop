exports.getAdd = (req, res, next) => {
    res.render('add-product', {
        validationError: req.flash('validationErrors'),
        isUser: true,
        isAdmin: true,
    })
}