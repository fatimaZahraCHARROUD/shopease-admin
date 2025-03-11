import db from "../config/database.js";

// Récupérer toutes les commandes clients avec les informations du livreur
export const getCommandesClients = (callback) => {
  const q = `
        SELECT 
            commandec.id, 
            commandec.date,
            commandec.etat, 
            liv.nomcomplet as liv_nom , 
            liv.email as liv_email,
            client.nomcomplet as client_nom , 
            client.email as client_email,   
            concat (client.adresse , ' , ' ,client.ville)  as client_adresse    
             FROM 
            commandec 
        LEFT JOIN utilisateur liv
            ON commandec.id_livreur = liv.id 
        join utilisateur client
            ON commandec.id_client = client.id 
        WHERE 
            (liv.type_user = 'livreur' OR commandec.id_livreur IS NULL) and client.type_user ='client' 
    `;
  db.query(q, callback);
};

// Récupérer une commande client spécifique
export const getCommandeClientById = (id, callback) => {
  const q = "SELECT * FROM commandec WHERE id = ?";
  db.query(q, [id], callback);
};

// Récupérer les produits d'une commande client
export const getProduitsCommandeClient = (id, callback) => {
  const q = `
        SELECT 
            p.*, 
            pc.quantite AS quantite_commande, 
            c.nom AS categorie, 
            d.adresse AS depot
        FROM produit p
        JOIN produit_cc pc ON p.id = pc.id_produit
        LEFT JOIN categorie c ON p.id_categorie = c.id
        LEFT JOIN depot d ON p.id_depot = d.id
        WHERE pc.id_cc = ?
    `;
  db.query(q, [id], callback);
};

// Ajouter une commande client
export const addCommandeClient = (data, callback) => {
  const q = "INSERT INTO commandec (`date`, `etat`, `id_livreur` ) VALUES (?)";
  const values = [data.date, data.etat, data.id_livreur];
  db.query(q, [values], callback);
};

// Mettre à jour une commande client
export const updateCommandeClient = (id, data, callback) => {
  const q = "UPDATE commandec SET id_livreur = ?, etat = ? WHERE id = ?";
  db.query(q, [data.id_livreur, "affecté", id], callback);
};

// Supprimer une commande client
export const deleteCommandeClient = (id, callback) => {
  const q = "DELETE FROM commandec WHERE id = ?";
  db.query(q, [id], callback);
};

// Récupérer tous les livreurs
export const getLivreurs = (callback) => {
  const q = "SELECT * FROM utilisateur WHERE type_user = 'livreur'";
  db.query(q, callback);
};
