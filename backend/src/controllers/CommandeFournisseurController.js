import {
    getCommandesFournisseurs,
    getCommandeFournisseurById,
    getProduitsCommandeFournisseur,
    addCommandeFournisseur,
    acceptCommandeFournisseur,
    receiveCommandeFournisseur,
    deleteCommandeFournisseur
  } from "../models/CommandeFournisseurModel.js";
  
  // Récupérer toutes les commandes fournisseurs
  export const getAllCommandesFournisseurs = (req, res) => {
    getCommandesFournisseurs((err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  };
  
  // Récupérer une commande fournisseur par ID
  export const getCommandeFournisseur = (req, res) => {
    getCommandeFournisseurById(req.params.id, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  };
  
  // Récupérer les produits d'une commande fournisseur
  export const getProduitsCommande = (req, res) => {
    getProduitsCommandeFournisseur(req.params.id, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  };
  
  // Ajouter une commande fournisseur
  export const createCommandeFournisseur = (req, res) => {
    addCommandeFournisseur(req.body, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: data });
    });
  };
  
  // Accepter une commande fournisseur
  export const acceptCommande = (req, res) => {
    acceptCommandeFournisseur(req.params.id, req.body, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Commande acceptée avec succès !" });
    });
  };
  
  // Recevoir une commande fournisseur
  export const receiveCommande = (req, res) => {
    receiveCommandeFournisseur(req.params.id, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: data });
    });
  };
  
  // Supprimer une commande fournisseur
  export const deleteCommandeFournisseurById = (req, res) => {
    deleteCommandeFournisseur(req.params.id, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Commande fournisseur supprimée avec succès !" });
    });
  };
  