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

exports.editItem = async(id, newData) => {
    try{
        await mongoose.connect(DB_URL)
        await CartItem.updateOne({_id: id}, newData)
        await mongoose.disconnect()
    }
    catch(err){
        await mongoose.disconnect()
        console.log('edit item err: ' + err)
    }
}

exports.addNewItem = async(data) => {
    try {
        await mongoose.connect(DB_URL)
        let oldItem = await CartItem.find({ productId: data.productId })
        if(oldItem.length !== 0){
            await CartItem.updateOne({productId: data.productId}, data)
        }else{
            let newItem = new CartItem(data);
            await newItem.save()
            await mongoose.disconnect()
        }
    }catch(err){
        await mongoose.disconnect()
        console.log('add item err :' + err)
    }
}

exports.getItemByUser = async(userId) => {
    try{
        await mongoose.connect(DB_URL)
        let items = await CartItem.find(
            {userId : userId},
            {},
            {sort: {timestamp: 1}}
        )
        await mongoose.disconnect()
        return items
    }catch(err){
        await mongoose.disconnect()
        console.log('get item err :' + err)
    }
}

exports.deleteItem = async(id) => {
    try{
        await mongoose.connect(DB_URL)
        await CartItem.findByIdAndDelete(id);
        await mongoose.disconnect()
    }catch(err){
        await mongoose.disconnect()
        console.log('delete item err :' + err)
    }
}

exports.deleteAllItems = async() => {
    try{
        await mongoose.connect(DB_URL)
        await CartItem.deleteMany({});
        await mongoose.disconnect()
    }catch(err){
        await mongoose.disconnect()
        console.log('delete all items err :' + err)
    }
}
