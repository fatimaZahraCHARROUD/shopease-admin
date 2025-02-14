import db from "../config/database.js";

// Récupérer toutes les factures
export const getAllFactures = (callback) => {
  const query = `
    SELECT 
      f.id AS facture_id,
      cf.id AS id_commandefournisseur,
      fo.nomcomplet AS fournisseur_nom,
      fo.email AS fournisseur_email,
      GROUP_CONCAT(DISTINCT p.nom SEPARATOR ', ') AS produits,
      GROUP_CONCAT(DISTINCT p.prix SEPARATOR ', ') AS prix_unitaires,
      GROUP_CONCAT(pcf.quantite SEPARATOR ', ') AS quantites,
      f.prixTotal AS prix_total,
      f.date AS date_facture
    FROM facture f
    JOIN commandef cf ON f.id_commandef = cf.id
    JOIN produit_cf pcf ON pcf.id_cf = cf.id
    JOIN fournisseur fo ON cf.id_fournisseur = fo.id
    JOIN produit p ON pcf.id_produit = p.id
    GROUP BY f.id;
  `;
  db.query(query, callback);
};

// Récupérer une facture spécifique par ID
export const getFactureById = (id, callback) => {
  const query = `SELECT * FROM facture WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erreur SQL :", err);
      return callback(err);
    }
    if (result.length === 0) {
      console.warn("⚠️ Aucune facture trouvée avec cet ID !");
      return callback(null, null);
    }
    callback(null, result[0]);
  });
};


// Récupérer les détails d'une facture par ID
export const getFactureDetailsById = (id, callback) => {
  const queryFacture = `
    SELECT 
      f.id AS facture_id,
      cf.id AS id_commandefournisseur,
      fo.nomcomplet AS fournisseur_nom,
      fo.email AS fournisseur_email,
      GROUP_CONCAT(p.nom SEPARATOR ', ') AS produits,
      GROUP_CONCAT(p.prix SEPARATOR ', ') AS prix_unitaires,
      GROUP_CONCAT(pcf.quantite SEPARATOR ', ') AS quantites,
      f.prixTotal AS prix_total,
      f.date AS date_facture
    FROM facture f
    JOIN commandef cf ON f.id_commandef = cf.id
    JOIN produit_cf pcf ON pcf.id_cf = cf.id
    JOIN fournisseur fo ON cf.id_fournisseur = fo.id
    JOIN produit p ON pcf.id_produit = p.id
    WHERE f.id = ? 
    GROUP BY f.id;
  `;

  db.query(queryFacture, [id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des détails de la facture :", err);
      callback(err, null);
    } else {
      callback(null, results.length > 0 ? results[0] : null);
    }
  });
};

// Ajouter une facture
export const addFacture = (facture, callback) => {
  const { date, id_commandef } = facture;

  // Récupérer les produits et quantités de la commande fournisseur
  const queryCommandeProduits = `
    SELECT cp.id_produit, cp.quantite, p.prix 
    FROM produit_cf cp
    INNER JOIN produit p ON cp.id_produit = p.id
    WHERE cp.id_cf = ?;
  `;

  db.query(queryCommandeProduits, [id_commandef], (err, produits) => {
    if (err) return callback(err);
    if (!produits.length) return callback(null, { error: "Aucun produit trouvé pour cette commande fournisseur." });

    // Calculer le prix total
    const prixTotal = produits.reduce((sum, { prix, quantite }) => sum + prix * quantite, 0);

    // Insérer la facture
    const queryInsertFacture = `
      INSERT INTO facture (date, prixTotal, id_commandef) 
      VALUES (?, ?, ?);
    `;

    db.query(queryInsertFacture, [date, prixTotal, id_commandef], (err, resultFacture) => {
      if (err) return callback(err);

      const factureId = resultFacture.insertId;

      // Insérer les produits associés dans produit_facture
      const queryInsertProduitFacture = `
        INSERT INTO produit_facture (produit_id, facture_id) 
        VALUES ?
      `;

      const produitFactureValues = produits.map(({ id_produit }) => [id_produit, factureId]);

      db.query(queryInsertProduitFacture, [produitFactureValues], (err) => {
        if (err) return callback(err);
        callback(null, { message: "Facture ajoutée avec succès", factureId });
      });
    });
  });
};

// Mettre à jour une facture
export const updateFacture = (id, facture, callback) => {
  const { date, id_commandef } = facture;

  // Mettre à jour la facture
  const updateFactureQuery = `
    UPDATE facture 
    SET date = ?, id_commandef = ? 
    WHERE id = ?
  `;

  db.query(updateFactureQuery, [date, id_commandef, id], (err) => {
    if (err) return callback(err);

    // Supprimer les anciens produits associés
    const deleteProduitFactureQuery = `DELETE FROM produit_facture WHERE facture_id = ?`;

    db.query(deleteProduitFactureQuery, [id], (err) => {
      if (err) return callback(err);

      // Ajouter les nouveaux produits associés
      const insertProduitFactureQuery = `
        INSERT INTO produit_facture (produit_id, facture_id)
        SELECT id_produit, ?
        FROM produit_cf
        WHERE id_cf = ?
      `;

      db.query(insertProduitFactureQuery, [id, id_commandef], callback);
    });
  });
};

// Supprimer une facture
export const deleteFacture = (id, callback) => {
  const deleteProduitFactureQuery = "DELETE FROM produit_facture WHERE facture_id = ?";
  db.query(deleteProduitFactureQuery, [id], (err) => {
    if (err) return callback(err);

    const deleteFactureQuery = "DELETE FROM facture WHERE id = ?";
    db.query(deleteFactureQuery, [id], callback);
  });
};

// Récupérer les produits d'une commande fournisseur
export const getProduitsByCommandeFournisseur = (id, callback) => {
  const query = `
    SELECT cp.id_produit, cp.quantite, p.prix, p.nom
    FROM produit_cf cp
    INNER JOIN produit p ON cp.id_produit = p.id
    WHERE cp.id_cf = ?
  `;
  db.query(query, [id], callback);
};
