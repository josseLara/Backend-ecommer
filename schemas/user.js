import mongoose from "mongoose";

export const userShema = mongoose.Schema({
     name:String,
     img:String,
     email:String,
     pass:String
})