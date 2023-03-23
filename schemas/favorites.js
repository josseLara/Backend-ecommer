import mongoose from "mongoose";

export const favoritesSchemas = mongoose.Schema({
     product:String,
     user:String
});