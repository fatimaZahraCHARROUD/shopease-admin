import { 
    getAllCategories, 
    getCategorieById, 
    getCategorieDetails, 
    addCategorie, 
    updateCategorie, 
    deleteCategorie 
  } from "../models/CategorieModel.js";
  
  // Récupérer toutes les catégories
  export const getCategories = (req, res) => {
    getAllCategories((err, data) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", error: err });
      return res.json(data);
    });
  };
  
  // Récupérer une catégorie spécifique
  export const getCategorie = (req, res) => {
    getCategorieById(req.params.id, (err, data) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", error: err });
      if (data.length === 0) return res.status(404).json({ message: "Catégorie non trouvée" });
      return res.json(data);
    });
  };
  
  // Récupérer les produits d'une catégorie spécifique
  export const getCategorieProduits = (req, res) => {
    getCategorieDetails(req.params.id, (err, data) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", error: err });
      if (data.length === 0) return res.status(404).json({ message: "Aucun produit trouvé pour cette catégorie" });
      return res.json(data);
    });
  };
  
  // Ajouter une nouvelle catégorie
  export const createCategorie = (req, res) => {
    const { nom } = req.body;
    if (!nom) return res.status(400).json({ message: "Le champ nom est requis" });
  
    addCategorie(nom, (err, data) => {
      if (err) return res.status(500).json({ message: "Erreur lors de l'ajout", error: err });
      return res.json({ message: "Catégorie ajoutée avec succès !" });
    });
  };
  
  // Modifier une catégorie
  export const editCategorie = (req, res) => {
    const { id } = req.params;
    const { nom } = req.body;
    if (!nom) return res.status(400).json({ message: "Le champ nom est requis" });
  
    updateCategorie(id, nom, (err, data) => {
      if (err) return res.status(500).json({ message: "Erreur lors de la modification", error: err });
      return res.json({ message: "Catégorie modifiée avec succès !" });
    });
  };
  
  // Supprimer une catégorie
  export const removeCategorie = (req, res) => {
    deleteCategorie(req.params.id, (err, data) => {
      if (err) return res.status(500).json({ message: "Erreur lors de la suppression", error: err });
      return res.json({ message: "Catégorie supprimée avec succès !" });
    });
  };
  