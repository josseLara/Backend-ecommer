import { Router } from "express";
import { getFavorites, setAddFavorites, setRemoveFavorites } from "../../controllers/favorites.js";

export const routerFavorites = Router();


routerFavorites.post( "/", getFavorites )
routerFavorites.post("/add",setAddFavorites)
routerFavorites.delete("/",setRemoveFavorites)
routerFavorites.get( "/", ( req, res ) => {
     res.send( 'favooo' )
} )

