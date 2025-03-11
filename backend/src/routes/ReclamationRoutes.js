// routes/reclamationRoutes.js

import express from 'express';
import { getReclamations } from '../controllers/ReclamationController.js';

const router = express.Router();

router.get('/reclamations', getReclamations);

export default router;
