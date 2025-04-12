import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productname: 
  { 
    type: String, 
    required: true 
    },
  description: String,
  price: 
  { 
    type: Number, required: true 
    },
  category: String,
  brand: String,
  size: String,
  color: String,
  imageUrl: String,
  userId:{
    type:String,
    required:true,
}
},

{ timestamps: true });

export const product = mongoose.model('product', productSchema);