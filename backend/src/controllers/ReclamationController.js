// controller/reclamationController.js

import * as reclamationModel from '../models/ReclamationModel.js';

const getReclamations = async (req, res) => {
  try {
    const results = await reclamationModel.getAllReclamations();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getReclamations };
