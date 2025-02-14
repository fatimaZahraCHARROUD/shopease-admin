import db from "../config/database.js";

// Récupérer tous les dépôts
export const getDepots = (callback) => {
  const q = "SELECT id, adresse FROM depot";
  db.query(q, callback);
};

// Récupérer un dépôt spécifique
export const getDepotById = (id, callback) => {
  const q = "SELECT * FROM depot WHERE id = ?";
  db.query(q, [id], callback);
};

// Ajouter un nouveau dépôt
export const addDepot = (data, callback) => {
  const q = "INSERT INTO depot (`adresse`) VALUES (?)";
  db.query(q, [data.adresse], callback);
};

// Mettre à jour un dépôt
export const updateDepot = (id, data, callback) => {
  const q = "UPDATE depot SET adresse = ? WHERE id = ?";
  db.query(q, [data.adresse, id], callback);
};

// Supprimer un dépôt
export const deleteDepot = (id, callback) => {
  const q = "DELETE FROM depot WHERE id = ?";
  db.query(q, [id], callback);
};
