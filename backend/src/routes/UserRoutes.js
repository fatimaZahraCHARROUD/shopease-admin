import express from "express";
const router = express.Router();
import userController from "../controllers/UserController.js"; // Assurez-vous de mettre l'extension .js

// Route pour la connexion
router.post("/signin", userController.signIn);


 export default router;
