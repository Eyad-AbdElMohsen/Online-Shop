const router = require('express').Router();
const bodyParser = require('body-parser')
const check = require('express-validator').check

const authGuard = require('./guards/auth.guard')

const cartController  = require('../controllers/cart.controller')

router.post('/' , authGuard.isAuth , bodyParser.urlencoded({extended : true}) , 
    check('amount')
        .not().isEmpty().withMessage("amount is required")
        .isInt({ min : 1 }).withMessage("amount is required greater than 0"),
    cartController.postCart
)

module.exports =  router 
