import express from "express";
import { getAllDepots, getDepot, createDepot, updateDepotById, deleteDepotById } from "../controllers/DepotController.js";

const router = express.Router();

router.get("/depot", getAllDepots); // Obtenir tous les dépôts
router.get("/depot/:id", getDepot); // Obtenir un dépôt par ID
router.post("/depot", createDepot); // Ajouter un dépôt
router.put("/depot/:id", updateDepotById); // Mettre à jour un dépôt
router.delete("/depot/:id", deleteDepotById); // Supprimer un dépôt

export default router;
