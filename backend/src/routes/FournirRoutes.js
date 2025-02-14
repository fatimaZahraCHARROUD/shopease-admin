import express from "express";
import { getFournisseurProduits } from "../controllers/FournirController.js";

const router = express.Router();

// Endpoint pour récupérer les produits d'un fournisseur spécifique
router.get("/fournir/:fournisseurId", getFournisseurProduits);

export default router;
