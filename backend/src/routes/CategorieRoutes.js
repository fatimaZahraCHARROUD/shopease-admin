import express from "express";

//Importation des methodes de contrôleur
import { 
  getCategories, 
  getCategorie, 
  getCategorieProduits, 
  createCategorie, 
  editCategorie, 
  removeCategorie 
} from "../controllers/CategorieController.js";

//Création d'un routeur Express
const router = express.Router();

//Définition des routes
router.get("/categorie", getCategories); // Obtenir toutes les catégories
router.get("/categorie/:id", getCategorie); // Obtenir une catégorie spécifique
router.get("/categorie_details/:id", getCategorieProduits); // Obtenir les produits d'une catégorie spécifique
router.post("/categorie", createCategorie); // Ajouter une catégorie
router.put("/categorie/:id", editCategorie); // Modifier une catégorie
router.delete("/categorie/:id", removeCategorie); // Supprimer une catégorie

//Permet d'importer ce routeur dans un fichier
export default router;
