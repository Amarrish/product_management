import mongoose from 'mongoose';
import validator from 'validator'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'username required']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password:{
        type:String,
        required:[true, 'password required']
    }
})

export const users = mongoose.model('users', userSchema);
