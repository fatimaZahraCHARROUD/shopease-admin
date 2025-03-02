import db from "../config/database.js";

// Récupérer tous les clients ayant passé au moins une commande
export const getClients = (callback) => {
  const q = `
    SELECT DISTINCT u.* 
    FROM utilisateur u
    JOIN commandec c ON u.id = c.id_client
    WHERE u.type_user = 'client'
  `;
  db.query(q, callback);
};


// Récupérer un client spécifique ayant passé au moins une commande
export const getClientById = (id, callback) => {
  const q = `
    SELECT DISTINCT u.* 
    FROM utilisateur u
    JOIN commandec c ON u.id_user = c.id_client
    WHERE u.id = ? AND u.type_user = 'client'
  `;
  db.query(q, [id], callback);
};

// Mettre à jour un client
export const updateClient = (id, data, callback) => {
  const q = "UPDATE utilisateur SET nomcomplet = ?, email = ?, password = ?, adresse = ?, tel = ? WHERE id = ?";
  db.query(q, [data.nomcomplet, data.email, data.password, data.adresse, data.tel, id], callback);
};