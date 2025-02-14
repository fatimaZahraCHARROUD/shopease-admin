import express from "express";
import { 
  getAllCommandesClients,
  getCommandeClient,
  getProduitsCommande,
  createCommandeClient,
  updateCommandeClientById,
  deleteCommandeClientById,
  getAllLivreurs
} from "../controllers/CommandeClientController.js";

const router = express.Router();

router.get("/commandec", getAllCommandesClients); // Obtenir toutes les commandes clients
router.get("/commandec/:id", getCommandeClient); // Obtenir une commande par ID
router.get("/produit_cc/:id", getProduitsCommande); // Obtenir les produits d'une commande client
router.post("/commandec", createCommandeClient); // Ajouter une commande client
router.put("/commandec/:id", updateCommandeClientById); // Mettre à jour une commande client
router.delete("/commandec/:id", deleteCommandeClientById); // Supprimer une commande client
router.get("/livreur", getAllLivreurs); // Obtenir tous les livreurs

export default router;
