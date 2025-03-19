//Importation des fonctions du modèle
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

    // Retourner le premier élément au lieu d'un tableau
    return res.json(data[0]); // On retourne uniquement l'objet
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
  const { nom, imgurl } = req.body;

  // Vérification des champs obligatoires
  if (!nom || !imgurl) {
    return res.status(400).json({ message: "Les champs nom et imgurl sont requis." });
  }

  addCategorie(nom, imgurl, (err, data) => {
    if (err) {
      console.error("Erreur lors de l'ajout de la catégorie :", err);
      return res.status(500).json({ message: "Erreur lors de l'ajout de la catégorie.", error: err });
    }
    return res.status(201).json({ message: "Catégorie ajoutée avec succès !" });
  });
};

// Modifier une catégorie existante
export const editCategorie = (req, res) => {
  const { id } = req.params; // Récupération de l'ID depuis les paramètres de la requête
  const { nom, imgurl } = req.body;

  // Vérification des champs obligatoires
  if (!nom || !imgurl) {
    return res.status(400).json({ message: "Les champs nom et imgurl sont requis pour la mise à jour." });
  }

  updateCategorie(id, nom, imgurl, (err, data) => {
    if (err) {
      console.error("Erreur lors de la modification de la catégorie :", err);
      return res.status(500).json({ message: "Erreur lors de la modification de la catégorie.", error: err });
    }
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
  