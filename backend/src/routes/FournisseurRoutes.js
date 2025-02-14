import express from "express";
import {
  getFournisseurs,
  getFournisseur,
  addFournisseur,
  updateFournisseurById,
  deleteFournisseurById
} from "../controllers/FournisseurController.js";

const router = express.Router();

router.get("/fournisseur", getFournisseurs);
router.get("/fournisseur/:id", getFournisseur);
router.post("/fournisseur", addFournisseur);
router.put("/fournisseur/:id", updateFournisseurById);
router.delete("/fournisseur/:id", deleteFournisseurById);
export default router;
