import { productModel } from "../models/product.js";
import jwt from "jsonwebtoken";
export const getProduct = async (req,res) => {
   
    const product = await productModel.find();
    jwt.verify( req.body.token, process.env.TOKEN_SECRETKEY, ( err, decodedToken ) => {
        if ( err ) {
             if ( err.name === 'TokenExpiredError' ) {
                  
                  return res.status( 401 ).send( 'El token ha expirado' );
             } else {
                 
                  return res.status( 401 ).send( 'Token no válido' );
             }
        }
   
        res.json(product)
       
   } )
}

export const setAddProduct = () => {
    const product = new productModel( {
        name: "Nike",
        price: "12.112",
        img: "",
        description: "zapatillas 2021",
        talla: "41",
        color: "rojo"
    } )
    product.save();
}

