import { Router } from "express";
import { getProduct } from "../../controllers/product.js";

export const routerProduct = Router();


routerProduct.post("/",getProduct)
routerProduct.get("/",(req,res)=>res.send('1221'))
// routerProduct.get("/",getProduct)
