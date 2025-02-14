import db from "../config/database.js";

// Récupérer les produits d'un fournisseur spécifique
export const getProduitsByFournisseur = (fournisseurId, callback) => {
  const query = `
      SELECT 
        f.id_produit, 
        p.*, 
        c.nom AS categorie, 
        d.adresse AS depot
      FROM 
        fournir f
      JOIN 
        produit p ON p.id = f.id_produit  
      LEFT JOIN 
        categorie c ON p.id_categorie = c.id
      LEFT JOIN 
        depot d ON p.id_depot = d.id    
      WHERE 
        f.id_fournisseur = ?   
  `;

  db.query(query, [fournisseurId], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des produits du fournisseur :", err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};
