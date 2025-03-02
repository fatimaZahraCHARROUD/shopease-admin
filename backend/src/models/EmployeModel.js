import db from "../config/database.js";

// Récupérer tous les employés
export const getEmployes = (callback) => {
  const q = "SELECT * FROM utilisateur WHERE type_user ='livreur'";
  db.query(q, callback);
};

// Récupérer un employé spécifique
export const getEmployeById = (id, callback) => {
  const q = "SELECT * FROM utilisateur WHERE id = ?";
  db.query(q, [id], callback);
};

// Ajouter un nouvel employé
export const addEmploye = (data, callback) => {
  const q = "INSERT INTO utilisateur (`nomcomplet`, `email`, `password`, `adresse`,`ville`, `type_user`, `tel`) VALUES (?)";
  const values = [data.nomcomplet, data.email, data.password, data.adresse, data.ville, "livreur", data.tel];
  db.query(q, [values], callback);
};

// Mettre à jour un employé
export const updateEmploye = (id, data, callback) => {
  const q = "UPDATE utilisateur SET nomcomplet = ?, email = ?, password = ?, adresse = ?,ville = ?, tel = ? WHERE id = ?";
  db.query(q, [data.nomcomplet, data.email, data.password, data.adresse,data.ville, data.tel, id], callback);
};

// Supprimer un employé
export const deleteEmploye = (id, callback) => {
  const q = "DELETE FROM utilisateur WHERE id = ?";
  db.query(q, [id], callback);
};
