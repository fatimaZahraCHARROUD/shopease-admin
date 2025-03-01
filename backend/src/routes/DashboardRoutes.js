import express from "express";
import { getClientsByCity,
  getTotalAchats , getTotalVentesController, topCategories, getSalesByMonth, totalClients, getTotalFournisseurs, getVentes, clientsPerMonth
} from "../controllers/DashboardController.js";

const router = express.Router();
// Obtenir le total des achats
router.get("/total-achats", getTotalAchats); 
router.get("/total-ventes", getTotalVentesController);
// Route pour récupérer les produits les plus vendus
router.get("/top-categories", topCategories);

router.get('/sales-by-month', getSalesByMonth);

router.get("/total-clients", totalClients);

router.get("/total-fournisseurs", getTotalFournisseurs);
router.get("/ventes", getVentes);
router.get("/clients-per-month", clientsPerMonth);

router.get('/clients-by-city', getClientsByCity); 
export default router;