import db from "../config/database.js";

// Récupérer tous les produits
export const getAllProducts = (callback) => {
  const query = `
    SELECT p.id, p.nom, p.description, p.prix, p.quantite, p.imgurl, 
           p.id_categorie, c.nom AS categorie_nom, p.id_depot, d.adresse AS depot_adresse, 
           GROUP_CONCAT(pf.id_fournisseur) AS fournisseurs
    FROM produit p
    JOIN categorie c ON p.id_categorie = c.id
    JOIN depot d ON p.id_depot = d.id
    LEFT JOIN fournir pf ON p.id = pf.id_produit
    GROUP BY p.id;
  `;
  db.query(query, callback);
};

// Récupérer un produit spécifique par ID
export const getProductById = (id, callback) => {
  const queryProduct = `
    SELECT p.*, c.nom AS categorie_nom, d.adresse AS depot_adresse
    FROM produit p
    LEFT JOIN categorie c ON p.id_categorie = c.id
    LEFT JOIN depot d ON p.id_depot = d.id
    WHERE p.id = ?
  `;

  const queryFournisseurs = `
    SELECT f.id_fournisseur, fr.nomcomplet AS fournisseur_nom
    FROM fournir f
    JOIN fournisseur fr ON f.id_fournisseur = fr.id
    WHERE f.id_produit = ?
  `;

  db.query(queryProduct, [id], (err, productResults) => {
    if (err) return callback(err);
    if (productResults.length === 0) return callback(null, []);

    const product = productResults[0];

    db.query(queryFournisseurs, [id], (err, fournisseurResults) => {
      if (err) return callback(err);
      product.fournisseurs = fournisseurResults;
      callback(null, product);
    });
  });
};

// Ajouter un produit
export const addProduct = (product, callback) => {
  const { name, description, price, quantity, imgurl, categoryId, suppliers = [], depotId } = product;

  const insertProductQuery = `
    INSERT INTO produit (nom, description, prix, imgurl, quantite, id_categorie, id_depot) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(insertProductQuery, [name, description, price, imgurl, quantity, categoryId, depotId], (err, result) => {
    if (err) return callback(err);

    const productId = result.insertId;

    if (suppliers.length > 0) {
      const insertSuppliersQuery = `
        INSERT INTO fournir (id_produit, id_fournisseur) 
        VALUES ?
      `;
      const supplierValues = suppliers.map((supplierId) => [productId, supplierId]);

      db.query(insertSuppliersQuery, [supplierValues], (err) => {
        if (err) return callback(err);
        callback(null, { message: "Produit et fournisseurs ajoutés avec succès." });
      });
    } else {
      callback(null, { message: "Produit ajouté avec succès (aucun fournisseur lié)." });
    }
  });
};

// Mettre à jour un produit
export const updateProduct = (id, product, callback) => {
  const { nom, description, prix, quantite, imgurl, id_categorie, id_depot, fournisseurs = [] } = product;

  const updateProductQuery = `
    UPDATE produit
    SET nom = ?, description = ?, prix = ?, quantite = ?, imgurl = ?, 
        id_categorie = ?, id_depot = ?
    WHERE id = ?
  `;

  db.query(updateProductQuery, [nom, description, prix, quantite, imgurl, id_categorie, id_depot, id], (err) => {
    if (err) return callback(err);

    const deleteFournisseursQuery = `DELETE FROM fournir WHERE id_produit = ?`;

    db.query(deleteFournisseursQuery, [id], (err) => {
      if (err) return callback(err);

      if (fournisseurs.length > 0) {
        const insertFournisseursQuery = `INSERT INTO fournir (id_produit, id_fournisseur) VALUES ?`;
        const fournisseurValues = fournisseurs.map((fournisseurId) => [id, fournisseurId]);

        db.query(insertFournisseursQuery, [fournisseurValues], callback);
      } else {
        callback(null, { message: "Produit mis à jour avec succès (aucun fournisseur lié)." });
      }
    });
  });
};

// Supprimer un produit
export const deleteProduct = (id, callback) => {
  db.query("DELETE FROM produit WHERE id = ?", [id], callback);
};

// Rechercher des produits par nom
export const searchProductsByName = (nom, callback) => {
  db.query("SELECT * FROM produit WHERE nom LIKE ?", [`%${nom}%`], callback);
};
