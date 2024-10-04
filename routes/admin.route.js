const router = require('express').Router()
const check = require('express-validator').check
const multer = require('multer')// same as bodyparser but for files (not only text)

const adminController = require('../controllers/admin.controller')
const adminGuard = require('./guards/admin.guard')

router.get('/add', adminGuard, adminController.getAdd)

router.post(
    '/add',
    adminGuard,
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'uploaded-imgs');
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '-' + file.originalname);
            },
        }),
    }).single('image'), // For file upload

    // Validation for all form fields
    check('name').notEmpty().withMessage('Name is required'),
    check('price')
        .notEmpty().withMessage('Price is required')
        .isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
    check('description').notEmpty().withMessage('Description is required'),
    check('category').notEmpty().withMessage('Category is required'),
    check('image').custom((value, { req }) => {
        if (req.file) return true;
        throw new Error('Image is required');
    }),
    adminController.postAdd
);

router.get('/orders', adminGuard, adminController.getOrders)

router.post('/orders/save', adminGuard, adminController.postOrders)

module.exports = router;