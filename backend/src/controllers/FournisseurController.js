import {
    getAllFournisseurs,
    getFournisseurById,
    createFournisseur,
    updateFournisseur,
    deleteFournisseur
  } from "../models/FournisseurModel.js";
  
  export const getFournisseurs = (req, res) => {
    getAllFournisseurs((err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  };
  
  export const getFournisseur = (req, res) => {
    getFournisseurById(req.params.id, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json({ message: "Fournisseur introuvable" });
      return res.json(data[0]);
    });
  };
  
  export const addFournisseur = (req, res) => {
    createFournisseur(req.body, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json({ message: "Fournisseur ajouté avec succès !" });
    });
  };
  
  export const updateFournisseurById = (req, res) => {
    const fournisseurId = req.params.id; 
    const { nomcomplet, email, tel, adresse } = req.body;
  
    if (!nomcomplet || !email || !tel || !adresse) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }
  
    updateFournisseur(fournisseurId, req.body, (err, data) => {
      if (err) return res.status(500).json({ error: "Erreur lors de la mise à jour" });
      if (data.affectedRows === 0) {
        return res.status(404).json({ message: "Fournisseur introuvable" });
      }
      return res.json({ message: "Fournisseur mis à jour avec succès !" });
    });
  };

  
  export const deleteFournisseurById = (req, res) => {
    deleteFournisseur(req.params.id, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0) return res.status(404).json({ message: "Fournisseur introuvable" });
      return res.json({ message: "Fournisseur supprimé avec succès !" });
    });
  };
  