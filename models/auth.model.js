const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { reject } = require("bcrypt/promises");
const HttpError = require('../errors/http.error');
const DB_URL = 'mongodb://localhost:27017/online-shop'

const userSchema = mongoose.Schema({
    username : String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

const User = mongoose.model("user" , userSchema);

exports.createNewUser = async(username , email , password) => {
    // check if email exists
    // create new acc
    try {
        await mongoose.connect(DB_URL)
        let mail = await User.findOne({email : email})
        if(!mail){
            //create
            let hashedPass = await bcrypt.hash(password , 10)
            let user = new User({
                username: username,
                email: email ,
                password: hashedPass,
            })
            await user.save()
            await mongoose.disconnect()
            return user
        }
        else{
            // err
            await mongoose.disconnect()
            throw new HttpError("Email already exists" , "models/auth/createNewUser" , 400);
        }
    }catch(err){
        throw err
    }
}

exports.login = async(email , password) => {
    //check for email 
    try{
        await mongoose.connect(DB_URL)
        let user = await User.findOne({email : email})
        if(!user) {
            // err
            await mongoose.disconnect()
            throw new HttpError("Email doesn't exist" , "models/auth/login" , 400)
        }
        else {
            //check for pass
            let isPassCorrect = await bcrypt.compare(password , user.password)
            if(!isPassCorrect){
                //err
                await mongoose.disconnect()
                throw new HttpError("Password isn't correct" , "models/auth/login" , 400)
            }
            else {
                // login successfully
                // set session 
                await mongoose.disconnect()
                return {
                    id: user._id,
                    isAdmin: user.isAdmin,
                }
            }
        }
    }catch(err){
        throw err
    }
}