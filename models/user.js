import mongoose from "mongoose";
import { userShema } from "../schemas/user.js";

export const userModel = mongoose.model("User",userShema)