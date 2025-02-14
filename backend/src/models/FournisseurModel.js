import db from "../config/database.js";

// Récupérer tous les fournisseurs
export const getAllFournisseurs = (callback) => {
  db.query("SELECT * FROM fournisseur", callback);
};

// Récupérer un fournisseur par ID
export const getFournisseurById = (id, callback) => {
  db.query("SELECT * FROM fournisseur WHERE id = ?", [id], callback);
};

// Ajouter un fournisseur
export const createFournisseur = (data, callback) => {
  const q = "INSERT INTO fournisseur (nomcomplet, email, tel, adresse) VALUES (?)";
  db.query(q, [[data.nomcomplet, data.email, data.tel, data.adresse]], callback);
};

// Mettre à jour un fournisseur
export const updateFournisseur = (id, data, callback) => {
  const q = "UPDATE fournisseur SET nomcomplet = ?, email = ?, tel = ?, adresse = ? WHERE id = ?";
  db.query(q, [data.nomcomplet, data.email, data.tel, data.adresse, id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour du fournisseur :", err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Supprimer un fournisseur
export const deleteFournisseur = (id, callback) => {
  db.query("DELETE FROM fournisseur WHERE id = ?", [id], callback);
};
