import { favoritesModel } from "../models/favorites.js";
import uniqid from 'uniqid';

export const setAddFavorites = (req,res) => {
    const favorites = new favoritesModel( {
        product: req.body.product,
        user: req.body.email
    } )
    favorites.save();
    res.send('guardado')
}

export const getFavorites = async (req,res) =>{
    const favorites = await favoritesModel.find({ user: req.body.email });
    res.send(favorites);
}

export const setRemoveFavorites = async (req,res) =>{
    const favorites = await favoritesModel.findOneAndRemove({ product: req.query.product,user: req.query.email });
    res.send('eliminado');
}
