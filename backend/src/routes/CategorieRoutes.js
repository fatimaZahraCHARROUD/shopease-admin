import express from "express";
import { 
  getCategories, 
  getCategorie, 
  getCategorieProduits, 
  createCategorie, 
  editCategorie, 
  removeCategorie 
} from "../controllers/CategorieController.js";

const router = express.Router();

router.get("/categorie", getCategories); // Obtenir toutes les catégories
router.get("/categorie/:id", getCategorie); // Obtenir une catégorie spécifique
router.get("/categorie_details/:id", getCategorieProduits); // Obtenir les produits d'une catégorie spécifique
router.post("/categorie", createCategorie); // Ajouter une catégorie
router.put("/categorie/:id", editCategorie); // Modifier une catégorie
router.delete("/categorie/:id", removeCategorie); // Supprimer une catégorie

export default router;
