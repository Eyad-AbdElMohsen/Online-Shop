const { Db } = require('mongodb');
const mongoose = require('mongoose')
const cartModel = require('./cart.model')

const DB_URL = 'mongodb://localhost:27017/online-shop'
const orderSchema = mongoose.Schema({
    userId : String,
    name : String, 
    amount : Number,
    cost : Number,
    status : String,
    timestamp : String,
})

const CartItem = mongoose.model('cart' , cartModel.cartSchema);
const orderItem = mongoose.model('order' , orderSchema);

exports.getOrdersByUser = async(userId) => {
    try{
        await mongoose.connect(DB_URL)
        let items = await orderItem.find({ userId : userId })
        await mongoose.disconnect()
        return items
    }catch(err){
        await mongoose.disconnect()
        console.log('get order by user err :' + err)
    }
}

exports.orderOneItem = async(userId, productId) => {
    try{
        await mongoose.connect(DB_URL)
        let item = await CartItem.findOne({
            userId: userId,
            productId: productId,
        });
        const today = new Date();
        const futureDate = new Date(today);
        const formattedDate = futureDate.toISOString(); 
        let newOrder = new orderItem({
            userId : userId,
            name : item.name, 
            amount : item.amount,
            cost : item.price * item.amount,
            status : "pending",
            timestamp : formattedDate.substring(0,10) 
        })
        await newOrder.save()
        await CartItem.findOneAndDelete({
            userId: userId,
            productId: productId,
        });
        await mongoose.disconnect()
    }catch(err){
        await mongoose.disconnect()
        console.log('order one item err :' + err)
    }
}

exports.orderAllItem = async(userId) => {
    try{
        await mongoose.connect(DB_URL)
        const items = await CartItem.find({ userId: userId });
        const today = new Date();
        const futureDate = new Date(today);
        const formattedDate = futureDate.toISOString(); 
        for(let item of items) {
            let newOrder = new orderItem({
                userId : userId,
                name : item.name, 
                amount : item.amount,
                cost : item.price * item.amount,
                status : "pending",
                timestamp : formattedDate.substring(0,10)
            })
            await newOrder.save()
        }
        await CartItem.deleteMany({});
        await mongoose.disconnect()
    }catch(err){
        await mongoose.disconnect()
        console.log('order all items err :' + err)
    }
}