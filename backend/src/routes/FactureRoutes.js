import express from "express";
import { getFactures, getFacture, getFactureDetails, createFacture, editFacture, removeFacture } from "../controllers/FactureController.js";

const router = express.Router();

router.get("/factures", getFactures);
router.get("/factures/:id", getFacture);
router.get("/facturesdet/:id", getFactureDetails);
router.post("/factures", createFacture);
router.put("/factures/:id", editFacture);
router.delete("/factures/:id", removeFacture);

export default router;
