import mongoose from "mongoose";
import { productSchemas } from "../schemas/product.js";

export const productModel = mongoose.model("Product",productSchemas)