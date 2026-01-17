import mongoose from "mongoose";
import { ProductType } from "../constant/index.js";

const Product = new mongoose.Schema({
    name:{
       type:String,
       required:true
    },
    type:{
        type:String,
        enum: ProductType,
        required:true
    },
    quantityInStock:{
        type:Number,
        required:true
    },
    mrp:{
        type:Number,
        required:true,
    },
    sellingPrice:{
        type:Number,
        required:true
    },
    brandName:{
        type:String,
        required:true
    },
    productImgs:{
        type: [String],
        required:true, 
    },
    isReturnEligible:{
        type:Boolean,
        default:false,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:`User`
    },
    status:{
        type:String,
        enum:['publish','unpublish'],
        default:'unpublish'
    }
},{timestamps:true});

export default mongoose.model('product',Product);