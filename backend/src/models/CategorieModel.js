import db from "../config/database.js";

// Récupérer toutes les catégories
export const getAllCategories = (callback) => {
  db.query("SELECT * FROM categorie", callback);
};

// Récupérer une catégorie spécifique par ID
export const getCategorieById = (id, callback) => {
  db.query("SELECT * FROM categorie WHERE id = ?", [id], callback);
};

// Récupérer les produits d'une catégorie spécifique
export const getCategorieDetails = (id, callback) => {
  const q = `
    SELECT p.*, c.nom as categorie_nom 
    FROM produit p 
    JOIN categorie c ON p.id_categorie = c.id 
    WHERE id_categorie = ?
  `;
  db.query(q, [id], callback);
};

// Ajouter une nouvelle catégorie
export const addCategorie = (nom, callback) => {
  db.query("INSERT INTO categorie (nom) VALUES (?)", [nom], callback);
};

// Mettre à jour une catégorie
export const updateCategorie = (id, nom, callback) => {
  db.query("UPDATE categorie SET nom = ? WHERE id = ?", [nom, id], callback);
};

// Supprimer une catégorie
export const deleteCategorie = (id, callback) => {
  db.query("DELETE FROM categorie WHERE id = ?", [id], callback);
};
