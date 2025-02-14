import {
    getCommandesClients,
    getCommandeClientById,
    getProduitsCommandeClient,
    addCommandeClient,
    updateCommandeClient,
    deleteCommandeClient,
    getLivreurs
  } from "../models/CommandeClientModel.js";
  
  // Récupérer toutes les commandes clients
  export const getAllCommandesClients = (req, res) => {
    getCommandesClients((err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  };
  
  // Récupérer une commande client par ID
  export const getCommandeClient = (req, res) => {
    const commandeId = req.params.id;
    getCommandeClientById(commandeId, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json({ message: "Commande client introuvable" });
      return res.json(data[0]);
    });
  };
  
  // Récupérer les produits d'une commande client
  export const getProduitsCommande = (req, res) => {
    const commandeId = req.params.id;
    getProduitsCommandeClient(commandeId, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json({ message: "Aucun produit trouvé pour cette commande" });
      return res.json(data);
    });
  };
  
  // Ajouter une nouvelle commande client
  export const createCommandeClient = (req, res) => {
    addCommandeClient(req.body, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Commande client ajoutée avec succès !" });
    });
  };
  
  // Mettre à jour une commande client
  export const updateCommandeClientById = (req, res) => {
    const commandeId = req.params.id;
    updateCommandeClient(commandeId, req.body, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0) return res.status(404).json({ message: "Commande non trouvée" });
      return res.json({ message: "Commande mise à jour avec succès !" });
    });
  };
  
  // Supprimer une commande client
  export const deleteCommandeClientById = (req, res) => {
    const commandeId = req.params.id;
    deleteCommandeClient(commandeId, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0) return res.status(404).json({ message: "Commande client introuvable" });
      return res.json({ message: "Commande client supprimée avec succès !" });
    });
  };
  
  // Récupérer tous les livreurs
  export const getAllLivreurs = (req, res) => {
    getLivreurs((err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  };
  