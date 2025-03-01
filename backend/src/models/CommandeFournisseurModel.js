import db from "../config/database.js";

// Récupérer toutes les commandes fournisseurs avec les informations du fournisseur
export const getCommandesFournisseurs = (callback) => {
  const q = `
        SELECT 
             commandef.id, 
            commandef.date, commandef.date_possible, commandef.date_reçue,
            commandef.etat, 
            fournisseur.nomcomplet, 
            fournisseur.email 
        FROM 
            commandef
        LEFT JOIN fournisseur 
            ON commandef.id_fournisseur = fournisseur.id   
          `;
  db.query(q, callback);
};

// Récupérer une commande fournisseur spécifique
export const getCommandeFournisseurById = (id, callback) => {
  const q = "SELECT * FROM commandef WHERE id = ?";
  db.query(q, [id], callback);
};

// Récupérer les produits d'une commande fournisseur
export const getProduitsCommandeFournisseur = (id, callback) => {
  const q = `
        SELECT 
            p.*, 
            pc.quantite AS quantite_commande, 
            c.nom AS categorie, 
            d.adresse AS depot
        FROM produit p
        JOIN produit_cf pc ON p.id = pc.id_produit
        LEFT JOIN categorie c ON p.id_categorie = c.id
        LEFT JOIN depot d ON p.id_depot = d.id
        WHERE pc.id_cf = ?
    `;
  db.query(q, [id], callback);
};

// Ajouter une commande fournisseur
export const addCommandeFournisseur = (data, callback) => {
  const q = "INSERT INTO commandef (`date`, `etat`, `id_fournisseur`) VALUES (CURDATE(), ?)";
  const values = [data.etat, data.id_fournisseur];

  db.query(q, [values], (err, result) => {
    if (err) return callback(err, null);
    
    const commandId = result.insertId;
    if (!data.produits || data.produits.length === 0) {
      return callback(null, "Commande fournisseur ajoutée sans produits.");
    }

    const produitQueries = data.produits.map((p) => {
      return new Promise((resolve, reject) => {
        const qProduit = "INSERT INTO produit_cf (`id_cf`, `id_produit`, `quantite`) VALUES (?)";
        const produitValues = [commandId, p.id_produit, p.quantite];

        db.query(qProduit, [produitValues], (err, res) => {
          if (err) reject(err);
          resolve(res);
        });
      });
    });

    Promise.all(produitQueries)
      .then(() => callback(null, "Commande fournisseur et produits ajoutés avec succès !"))
      .catch((err) => callback(err, null));
  });
};

// Mettre à jour une commande fournisseur en état "acceptée"
export const acceptCommandeFournisseur = (id, data, callback) => {
  const q = "UPDATE commandef SET etat = ?, date_possible = ? WHERE id = ?";
  db.query(q, ["acceptée", data.date_possible, id], callback);
};

// Mettre à jour une commande fournisseur en état "reçue"
export const receiveCommandeFournisseur = (id, callback) => {
  const updateCommandeQuery = "UPDATE commandef SET etat = ?, date_reçue = CURDATE() WHERE id = ?";

  db.query(updateCommandeQuery, ["reçue", id], (err, result) => {
    if (err) return callback(err, null);
    if (result.affectedRows === 0) return callback({ message: "Commande fournisseur introuvable" }, null);

    const getProductsQuery = `
        SELECT p.id AS produitId, pcf.quantite
        FROM produit_cf pcf
        INNER JOIN produit p ON pcf.id_produit = p.id
        WHERE pcf.id_cf = ?
      `;

    db.query(getProductsQuery, [id], (err, products) => {
      if (err) return callback(err, null);
      if (products.length === 0) return callback({ message: "Aucun produit associé à cette commande" }, null);

      const updateProductQuantityQuery = `UPDATE produit SET quantite = quantite + ? WHERE id = ?`;
      const updatePromises = products.map((product) => {
        return new Promise((resolve, reject) => {
          db.query(updateProductQuantityQuery, [product.quantite, product.produitId], (err, res) => {
            if (err) reject(err);
            resolve(res);
          });
        });
      });

      Promise.all(updatePromises)
        .then(() => callback(null, "Commande mise à jour et quantités des produits ajustées !"))
        .catch((err) => callback(err, null));
    });
  });
};

// Supprimer une commande fournisseur
export const deleteCommandeFournisseur = (id, callback) => {
  const deleteProductsQuery = "DELETE FROM produit_cf WHERE id_cf = ?";
  db.query(deleteProductsQuery, [id], (err) => {
    if (err) return callback(err, null);

    const deleteCommandQuery = "DELETE FROM commandef WHERE id = ?";
    db.query(deleteCommandQuery, [id], callback);
  });
};
