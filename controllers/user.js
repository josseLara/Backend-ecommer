import { userModel } from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUser = async ( req, res ) => {
     const user = await userModel.find();
     console.log( req.body );
}

export const setAddUser = async ( req, res ) => {
     let { nombre, email, pass, foto } = req.body;

     let passHash = await bcryptjs.hashSync( pass, 8 );

     const user = new userModel( {
          name: nombre,
          email: email,
          pass: passHash,
          img: foto
     } )
     user.save();
     res.send( { status: "ok" } )

}

export const getLoginUser = async ( req, res, next ) => {
     console.log( 'Ingreso correctamente' )
     res.redirect( process.env.URL_HOME )
     next();
}

// token del usuario
export const generarToken = async ( req, res ) => {
   
     const user = await userModel.findOne( { email: req.body.email } )
     const { email } = req.body;
     const payload = { name: user.name, img: user.img, email, };
     const secretKey = process.env.TOKEN_SECRETKEY;
     const options = { expiresIn: '1h' };
     const token = jwt.sign( payload, secretKey, options );

     res.send( { name: user.name, img: user.img, email, token } );

}

export const comprobarTokenExp = ( req, res ) => {
     // console.log('el token:::',req.body.token)
     jwt.verify( req.body.token, process.env.TOKEN_SECRETKEY, ( err, decodedToken ) => {
          if ( err ) {
               if ( err.name === 'TokenExpiredError' ) {
                    
                    return res.status( 401 ).send( 'El token ha expirado' );
               } else {
                   
                    return res.status( 401 ).send( 'Token no válido' );
               }
          }
     
          res.send( decodedToken );
         
     } )


}

export const alreadyRegisteredUser = ( req, res ) => {
 
     const tokenExiste = req.cookies.authLoaded;
     if ( tokenExiste ) {
          console.log( "La cookie existe:", tokenExiste );
          res.send( { token: tokenExiste } );
     } else {
          console.log( "La cookie no existe" );
          res.send( { error: "La cookie no existe" } );
     }

}
