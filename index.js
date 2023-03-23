  import express from "express";
  import cors from "cors";
  import dotenv from "dotenv"
  import { routerProduct } from "./router/product/index.js";
  import { routerUser } from "./router/user/index.js";
  import {routerFavorites} from "./router/favorites/index.js";
  import mongoose from "mongoose";
  import bodyParser from "body-parser";
  import cookieParser from "cookie-parser";

  dotenv.config()
  const port = process.env.PORT || 3001;
  const app = express();

  app.use(
      cors({
        origin: "https://ecommer-react.vercel.app",
      })
    );
  app.use( bodyParser.json( { limit: '50mb' } ) );
  app.use( bodyParser.urlencoded( { limit: '50mb', extended: true } ) );
  app.use( cookieParser() )
  app.use( "/product", routerProduct );
  app.use( "/user", routerUser );
  app.use( "/favorites", routerFavorites );


  const boostraping = async () => {
      await mongoose.connect( process.env.DB_URL )
      app.listen( port, ( error ) => console.log( "iniando" ) )
  }
  boostraping();