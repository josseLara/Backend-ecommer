import mongoose from "mongoose";

export const productSchemas = mongoose.Schema({
     name:String,
     price:String,
     img:Array,
     description:String,
     talla:Array,
     color: Array,
     marca:String
});