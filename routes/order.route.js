const router = require('express').Router();

const authGuard = require('./guards/auth.guard')

const orderController = require('../controllers/order.controller')

router.get('/',
    authGuard.isAuth, 
    orderController.getOrders
)

module.exports = router 



