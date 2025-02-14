import express from "express";
import { getAllEmployes, getEmploye, createEmploye, updateEmployeById, deleteEmployeById } from "../controllers/EmployeController.js";

const router = express.Router();

router.get("/employe", getAllEmployes); // Obtenir tous les employés
router.get("/employe/:id", getEmploye); // Obtenir un employé par ID
router.post("/employe", createEmploye); // Ajouter un employé
router.put("/employe/:id", updateEmployeById); // Mettre à jour un employé
router.delete("/employe/:id", deleteEmployeById); // Supprimer un employé

export default router;
