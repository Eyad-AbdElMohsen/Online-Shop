const router = require('express').Router();
const bodyParser = require('body-parser')
const check = require('express-validator').check

const authGuard = require('./guards/auth.guard')

const cartController  = require('../controllers/cart.controller')
const orderController  = require('../controllers/order.controller')

router.get('/',
    authGuard.isAuth, 
    cartController.getCart
)

router.post('/',
    authGuard.isAuth, 
    bodyParser.urlencoded({extended : true}), 
    check('amount')
        .not().isEmpty().withMessage("amount is required")
        .isInt({ min : 1 }).withMessage("amount is required greater than 0"),
    cartController.postCart
)

router.post('/save', 
    authGuard.isAuth, 
    bodyParser.urlencoded({extended : true}), 
    check('amount')
        .not().isEmpty().withMessage("amount is required")
        .isInt({ min : 1 }).withMessage("amount is required greater than 0"),
    cartController.postSave
)

router.post('/delete', 
    authGuard.isAuth, 
    bodyParser.urlencoded({extended : true}), 
    cartController.postDelete
)

router.post('/delete-all', 
    authGuard.isAuth, 
    bodyParser.urlencoded({extended : true}), 
    cartController.postDeleteAllItems
)

router.post('/order-one', 
    authGuard.isAuth,
    bodyParser.urlencoded({extended : true}),
    orderController.postOrder
)

router.post('/order-all', 
    authGuard.isAuth,
    bodyParser.urlencoded({extended : true}),
    orderController.postAllOrder
)

module.exports = router 
