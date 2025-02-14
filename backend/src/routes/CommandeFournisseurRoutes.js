import express from "express";
import {
  getAllCommandesFournisseurs,
  getCommandeFournisseur,
  getProduitsCommande,
  createCommandeFournisseur,
  acceptCommande,
  receiveCommande,
  deleteCommandeFournisseurById
} from "../controllers/CommandeFournisseurController.js";

const router = express.Router();

router.get("/commandef", getAllCommandesFournisseurs);
router.get("/commandef/:id", getCommandeFournisseur);
router.get("/produit_cf/:id", getProduitsCommande);
router.post("/commandef", createCommandeFournisseur);
router.put("/commandef/accept/:id", acceptCommande);
router.put("/commandef/recue/:id", receiveCommande);
router.delete("/commandef/:id", deleteCommandeFournisseurById);

export default router;
