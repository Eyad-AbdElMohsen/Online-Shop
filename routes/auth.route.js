const router = require('express').Router()
const bodyParser = require('body-parser')
const check = require('express-validator').check
const body = require('express-validator').body


const authController = require('../controllers/auth.controller')

router.get('/signup', authController.getSignup);

router.post('/signup',
    bodyParser.urlencoded({extended : true}),
    check("username" , "Username cant have a number")
        .exists().withMessage("Full name is required")
        .matches(/^[A-Za-z\s]+$/).withMessage("Name can only contain letters and spaces"),
    
    check("email" , "Email must be valid gmail")
        .exists().withMessage("Email is required")
        .isEmail().withMessage("invalid Email"),

    check("password" , "Must be between 8 and 64 characters, contain at least one number, one uppercase character and one lowercase character")
        .exists().withMessage("Password is required")
        .isLength({ min: 8, max: 64 }).withMessage("Password must be between 8 and 64 characters long")
        .matches(/(?=.*\d)/).withMessage("Password must contain at least one number")
        .matches(/(?=.*[a-z])/).withMessage("Password must contain at least one lowercase letter")
        .matches(/(?=.*[A-Z])/).withMessage("Password must contain at least one uppercase letter"),
    
    body("confirmPassword" , "Confirm your password")
    .custom((value , { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        else return true;
    }),
    authController.postSignup
)
router.get('/login', authController.getLogin);

router.post('/login',
    bodyParser.urlencoded({extended : true}),
    authController.postLogin
)

router.all('/logout' , authController.logout);

module.exports = router 