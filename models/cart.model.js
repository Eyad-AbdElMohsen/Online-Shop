const { Db } = require('mongodb');
const mongoose = require('mongoose')


const DB_URL = 'mongodb://localhost:27017/online-shop'
const cartSchema = mongoose.Schema({
    name : String, 
    price : Number,
    amount : Number,
    userId : String,
    productId : String,
    timestamp : Number,
})

const CartItem = mongoose.model('cart' , cartSchema);

exports.addNewItem = async( data ) => {
    try {
        await mongoose.connect(DB_URL)
        let item = new CartItem(data);
        await item.save()
        await mongoose.disconnect()
    }catch(err){
        await mongoose.disconnect()
        throw err
    }
}