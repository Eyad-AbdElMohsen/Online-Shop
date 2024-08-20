const authModel = require('../models/auth.model')
const validationResult = require('express-validator').validationResult

exports.getSignup = (req, res, next) => {
    res.render('signup', { 
        messages: req.flash('errors'),
        validationError: req.flash('validationErrors'),
        isUser: false
    });
}

exports.postSignup = async(req, res, next) => {
    if(validationResult(req).isEmpty()){
        try {
            await authModel.createNewUser(req.body.username , req.body.email , req.body.password)
            res.redirect('/login')
        }catch(err){
            req.flash('errors', err.userMessage || "An error has occured");
            res.redirect('/signup')
        }  
    }
    else{
        req.flash('validationErrors', validationResult(req).array() || "An error has occured");
        res.redirect('/signup')
    }
}

exports.getLogin = (req, res, next) => {
    res.render('login' , { 
        messages: req.flash('errors'),
        validationError : req.flash('validationErrors'),
        isUser: false
    });
}

exports.postLogin= async(req, res, next) => {
    if(validationResult(req).isEmpty()){
        try {
            let id = await authModel.login(req.body.email, req.body.password);
            req.session.userId = id
            res.redirect('/')
        }catch(err){
            req.flash('errors', err.userMessage || "An error has occured");
            res.redirect('/login')
        }
    }
    else{
        req.flash('validationErrors', validationResult(req).array() || "An error has occured");
        res.redirect('/login')
    }
}

exports.logout = async(req, res, next) => {
    try{
        await req.session.destroy(() => {
            res.redirect('/')
        })
    }catch(err){
        throw(err);
    }
}