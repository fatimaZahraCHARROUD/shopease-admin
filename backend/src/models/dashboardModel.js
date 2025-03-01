import db from "../config/database.js";

// Récupérer le total des achats à partir des commandes où l'état est "reçue"
export const getTotalAchatsQuery = (callback) => {
  const query = `
    SELECT COUNT(*) AS totalAchats 
    FROM commandef 
    WHERE etat = 'reçue'
  `;
  db.query(query, callback);
};

// Récupérer le total des ventes (NOUVEAU)
export const getTotalVentes = (callback) => {
  const query = "SELECT COUNT(*) AS totalVentes FROM commandec WHERE etat = 'livré'";
  db.query(query, callback);
};


export const getTopCategories = (annee, callback) => {
  const query = `
      SELECT c.id, c.nom AS name, COUNT(pc.id) AS ventes
      FROM categorie c
      JOIN produit p ON c.id = p.id_categorie
      JOIN produit_cc pc ON p.id = pc.id_produit
      JOIN commandec cmd ON pc.id_cc = cmd.id
      WHERE YEAR(cmd.date) = ?
      GROUP BY c.id, c.nom
      ORDER BY ventes DESC
      LIMIT 5;
    `;

  db.query(query, [annee], (err, results) => {
    if (err) {
      console.error("Erreur SQL :", err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};


export const getSalesData = (years, yearsPlaceholder, callback) => {
  // Vérification si les années sont valides
  if (!years || years.length === 0) {
    return callback(new Error("Années invalides"), null);
  }

  // Requête SQL pour récupérer les données de ventes par mois et par année
  const sql = `
    SELECT 
      MONTH(commandec.date) AS mois_num, 
      DATE_FORMAT(commandec.date, '%b') AS mois, 
      YEAR(commandec.date) AS annee,
      SUM(produit_cc.quantite * produit.prix) AS totalVente
    FROM commandec
    JOIN produit_cc ON commandec.id = produit_cc.id_cc
    JOIN produit ON produit_cc.id_produit = produit.id
    WHERE YEAR(commandec.date) IN (${yearsPlaceholder})
    GROUP BY annee, mois_num, mois
    ORDER BY annee DESC, mois_num;
  `;

  // Exécution de la requête avec les années sélectionnées
  db.query(sql, years, callback);
};





// TOTAL DES Clients
export const getTotalClients = (callback) => {
  const query = "SELECT COUNT(*) AS totalClients FROM utilisateur WHERE type_user = 'client'";
  db.query(query, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results[0]); // Renvoie l'objet avec totalClients
    }
  });
};

// TOTAL DES FOURNISSEURS
export const Fournisseur = {
  getTotalFournisseurs: (callback) => {
    const sql = "SELECT COUNT(*) AS totalFournisseurs FROM fournisseur";
    db.query(sql, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result[0]);
      }
    });
  }
};

export const getVentesParMois = (annee, callback) => {
  const query = `
    SELECT 
      MONTH(c.date) AS mois,
      SUM(pc.quantite * p.prix) AS total_vente
    FROM produit_cc pc
    JOIN produit p ON pc.id_produit = p.id
    JOIN commandec c ON pc.id_cc = c.id
    WHERE YEAR(c.date) = ?
    GROUP BY mois
    ORDER BY mois ASC;
  `;

  db.query(query, [annee], callback);
};

//total des clients par month
export const getClientsPerMonth = (annee, callback) => {
  const query = `
    SELECT MONTH(u.date) AS mois, COUNT(DISTINCT u.id) AS total_clients
    FROM utilisateur u
    WHERE u.type_user = 'client' AND YEAR(u.date) = ?
    GROUP BY MONTH(u.date)
    ORDER BY mois;
  `;

  db.query(query, [annee], (err, results) => {
    if (err) {
      console.error("Erreur SQL :", err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

//top city client
export const getAllClientsByCity = (year, callback) => {
    const sql = `
      SELECT u.ville, COUNT(DISTINCT c.id_client) AS total_clients
      FROM utilisateur u
      JOIN commandec c ON u.id = c.id_client
      WHERE u.type_user = 'client'
      AND YEAR(c.date) = ?  -- Filtrage par année
      GROUP BY u.ville
      ORDER BY total_clients DESC;
    `;
    
    db.query(sql, [year], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  };