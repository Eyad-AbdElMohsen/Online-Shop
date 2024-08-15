const authModel = require('../models/auth.model')

exports.getSignup = (req, res, next) => {
    res.render('signup', { messages: req.flash('errors') });
}

exports.postSignup = async(req, res, next) => {
    try {
        await authModel.createNewUser(req.body.username , req.body.email , req.body.password)
        res.redirect('/login')
    }catch(err){
        req.flash('errors', err.userMessage || "An error has occured");
        res.redirect('/signup')
    }    
}

exports.getLogin = (req, res, next) => {
    res.render('login' , { messages: req.flash('errors') });
}

exports.postLogin= async(req, res, next) => {
    try {
        let id = await authModel.login(req.body.email, req.body.password);
        req.session.userId = id
        res.redirect('/')
    }catch(err){
        req.flash('errors', err.userMessage || "An error has occured");
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