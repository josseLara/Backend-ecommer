import { check, validationResult } from "express-validator";
import { userModel } from "../models/user.js";
import bcryptjs from "bcryptjs";


// validation
const validateResult = ( req, res, next ) => {
     try {
          validationResult( req ).throw()
          return next()
     }
     catch ( err ) {
          res.status( 403 )
          console.log( err )

          res.send( { error: err.array() } )
     }
}

// auth login
export const authValidation = [
     // email
     check( 'email' )
          .exists()
          .not()
          .isEmpty()
          .isEmail()
          .custom( async ( value, { req } ) => {
               console.log(req.body)
               const user = await userModel.findOne( { email: value } )
               if ( user == null ) {
                    throw new Error( "El usuario no existe en la DB" )
                  
               }
               return true
          } ),
     // password
     check( 'pass' )
          .isLength( { min: 8 } )
          .not()
          .custom( async ( value, { req } ) => {
               const user = await userModel.findOne( { email: req.body.email } )
               // let passHash = await bcryptjs.hashSync(value,8);
               // compara el password 
               let compare = await bcryptjs.compareSync( value, user.pass );

               if ( compare ) {
                    throw new Error( "Contraseña incorrecta" );
               }
               return true
          } ),
     ( req, res, next ) => {
          validateResult( req, res, next )
     }
];

// auth sign Up

export const authValidationSignUp = [
     // email
     check( 'email' )
          .isString()
          .exists()
          .not()
          .isEmpty()
          .isEmail()
          .custom( async ( value, { req } ) => {
               const user = await userModel.findOne( { email: value } )
               if ( user != null ) {
                    throw new Error( "El usuario ya existe en la DB" )
                    
               }

               return true
          } ),
     // password
     check( 'pass' )
          .isString()
          .isLength( { min: 8 } )
          .not()
          .custom( async ( value, { req } ) => {
               if ( value == req.body.pass1 ) {
                    throw new Error( "Los password no son iguales" )
               }
               return true
          } ),
     ( req, res, next ) => {
          validateResult( req, res, next )
     }
];



