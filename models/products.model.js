const { Db } = require('mongodb');
const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/online-shop'
const productSchema = mongoose.Schema({
    name : String,
    category : String,
    price : Number,
    image : String,
    description : String 
})
const Product = mongoose.model('product' , productSchema);

exports.getAllProducts = async() => {
    // connect to db 
    // get products
    // disconnect
    try {
        await mongoose.connect(DB_URL)
        let products = await Product.find({})
        await mongoose.disconnect()
        return products
    }catch(err){
        await mongoose.disconnect()
        throw err
    }
}

exports.getAllProductsByCategory = async(category) => {
    try {
        await mongoose.connect(DB_URL)
        let products = await Product.find({ category : category})
        await mongoose.disconnect()
        return products
    }catch(err){
        throw err
    }
}

exports.getProductById = async(id) => {
    try {
        await mongoose.connect(DB_URL)
        let products = await Product.findById( id )
        await mongoose.disconnect()
        return products
    }catch(err){
        throw err
    }
}   