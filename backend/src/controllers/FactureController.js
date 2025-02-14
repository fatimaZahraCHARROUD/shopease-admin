import {
  getAllFactures,
  getFactureById,
  getFactureDetailsById,
  addFacture,
  updateFacture,
  deleteFacture,
} from "../models/FactureModel.js";

// Récupérer toutes les factures
export const getFactures = (req, res) => {
  getAllFactures((err, data) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    return res.json(data);
  });
};

// Récupérer une facture spécifique
export const getFacture = (req, res) => {
  getFactureById(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (!data) return res.status(404).json({ error: "Facture non trouvée" });
    return res.json(data);
  });
};

// Récupérer les détails d'une facture specifique
export const getFactureDetails = (req, res) => {
  const { id } = req.params;

  getFactureDetailsById(id, (err, facture) => {
    if (err) {
      return res.status(500).json({ error: "Erreur serveur" });
    }
    if (!facture) {
      return res.status(404).json({ error: "Facture non trouvée" });
    }
    return res.json(facture);
  });
};


// Ajouter une facture
export const createFacture = (req, res) => {
  addFacture(req.body, (err, data) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    return res.status(201).json(data);
  });
};

// Modifier une facture
export const editFacture = (req, res) => {
  updateFacture(req.params.id, req.body, (err, data) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    return res.json(data);
  });
};

// Supprimer une facture
export const removeFacture = (req, res) => {
  deleteFacture(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    return res.json({ message: "Facture supprimée avec succès." });
  });
};
