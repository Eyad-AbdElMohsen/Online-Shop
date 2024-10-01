const router = require('express').Router()
const check = require('express-validator').check
const multer = require('multer')// same as bodyparser but for files (not only text)

const adminController = require('../controllers/admin.controller')
const adminGuard = require('./guards/admin.guard')

router.get('/add', adminGuard, adminController.getAdd)

router.post('/add', adminGuard, multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploaded-imgs')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
}).single(/*input name in ejs file*/'image'),// there is a single file we will insert from a single input
check('uploaded-imgs').custom((value, {req}) => {
    if(req.file) return true;
    else throw 'img is required'
}),
adminController.postAdd)

router.get('/orders', adminGuard, adminController.getOrders)

router.post('/orders/save', adminGuard, adminController.postOrders)

module.exports = router;