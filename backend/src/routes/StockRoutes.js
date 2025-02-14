import express from "express";
import { getAllStock, getStockByFilter } from "../controllers/StockController.js";

const router = express.Router();

router.get("/stock", getAllStock); // Obtenir tous les produits du stock
router.get("/es/:filter", getStockByFilter); // Obtenir les entrées/sorties filtrées

export default router;
