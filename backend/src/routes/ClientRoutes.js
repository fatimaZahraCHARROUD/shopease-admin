import express from "express";
import { getAllClients, getClient } from "../controllers/ClientController.js";

const router = express.Router();

router.get("/client", getAllClients); // Obtenir tous les client
router.get("/client/:id", getClient); // Obtenir un client par ID
export default router;