import { 
    getAllProducts, 
    getProductById, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    searchProductsByName 
  } from "../models/ProductModel.js";
  
  // Récupérer tous les produits
  export const getProducts = (req, res) => {
    getAllProducts((err, data) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", error: err });
      return res.json(data);
    });
  };
  
  // Récupérer un produit spécifique
  export const getProduct = (req, res) => {
    getProductById(req.params.id, (err, data) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", error: err });
      if (!data) return res.status(404).json({ message: "Produit non trouvé" });
      return res.json(data);
    });
  };
  
  // Ajouter un produit
  export const createProduct = (req, res) => {
    addProduct(req.body, (err, data) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", error: err });
      return res.status(201).json(data);
    });
  };
  
  // Modifier un produit
  export const editProduct = (req, res) => {
    updateProduct(req.params.id, req.body, (err, data) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", error: err });
      return res.json(data);
    });
  };
  
  // Supprimer un produit
  export const removeProduct = (req, res) => {
    deleteProduct(req.params.id, (err, data) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", error: err });
      return res.json({ message: "Produit supprimé avec succès." });
    });
  };
  
  // Rechercher un produit par nom
  export const searchProducts = (req, res) => {
    searchProductsByName(req.query.nom, (err, data) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", error: err });
      return res.json(data);
    });
  };
  