import { getDepots, getDepotById, addDepot, updateDepot, deleteDepot } from "../models/DepotModel.js";

// Récupérer tous les dépôts
export const getAllDepots = (req, res) => {
  getDepots((err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

// Récupérer un dépôt par ID
export const getDepot = (req, res) => {
  const depotId = req.params.id;
  getDepotById(depotId, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({ message: "Dépôt introuvable" });
    return res.json(data[0]);
  });
};

// Ajouter un nouveau dépôt
export const createDepot = (req, res) => {
  addDepot(req.body, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Dépôt ajouté avec succès !" });
  });
};

// Mettre à jour un dépôt
export const updateDepotById = (req, res) => {
  const depotId = req.params.id;
  updateDepot(depotId, req.body, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) return res.status(404).json({ message: "Dépôt introuvable" });
    return res.json({ message: "Dépôt mis à jour avec succès !" });
  });
};

// Supprimer un dépôt
export const deleteDepotById = (req, res) => {
  const depotId = req.params.id;
  deleteDepot(depotId, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) return res.status(404).json({ message: "Dépôt introuvable" });
    return res.json({ message: "Dépôt supprimé avec succès !" });
  });
};
