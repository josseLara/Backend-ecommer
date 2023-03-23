import mongoose from "mongoose";
import { favoritesSchemas } from "../schemas/favorites.js";

export const favoritesModel = mongoose.model("Favorites",favoritesSchemas)