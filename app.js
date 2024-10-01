const express = require ('express')
const path = require ('path');
const flash = require('connect-flash');
const session = require('express-session');
const sessionStore = require('connect-mongodb-session')(session)


const app = express();
const homeRouter = require('./routes/home.route')
const productRouter = require('./routes/product.route')
const authRouter = require('./routes/auth.route');
const cartRouter = require('./routes/cart.route')
const orderRouter = require('./routes/order.route')
const adminRouter = require('./routes/admin.route')

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname , '/assets')))
app.use(express.static(path.join(__dirname , '/uploaded-imgs')))
app.use(express.json());

app.set('view engine' , 'ejs')
app.set('views' , 'views')

const STORE = new sessionStore({
    uri : 'mongodb://localhost:27017/online-shop',
    collection : 'sessions'
})

app.use(session({
    secret: 'It is not secret but it is secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        // 1 hour 
        // default : when u close the browser
        maxAge : 1*60*60*100
    },
    store : STORE
}));
app.use(flash());

app.use('/' , homeRouter)
app.use('/' , authRouter)
app.use('/product' , productRouter)
app.use('/cart' , cartRouter)
app.use('/orders' , orderRouter)
app.use('/admin' , adminRouter)


app.listen(3000, (err) => {
    if(err)
        console.log('error: ' + err)
    console.log('server listen on port 3000')
})