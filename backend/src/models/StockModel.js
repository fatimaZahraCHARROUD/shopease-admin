import db from "../config/database.js";

// Récupérer tous les produits avec leur dépôt
export const getStock = (callback) => {
  const q = `
        SELECT produit.*, depot.adresse as adresse
        FROM produit 
        JOIN depot ON produit.id_depot = depot.id
    `;
  db.query(q, callback);
};

// Récupérer les entrées et sorties des produits en fonction d'un filtre
export const getStockHistory = (filter, callback) => {
  const validFilters = ["Dernière semaine", "Dernier mois", "Dernière année", "Dernier jour"];
  
  if (!validFilters.includes(filter)) {
    return callback({ message: "Filtre invalide" }, null);
  }

  const currentDate = new Date();
  let filteredDate = new Date();

  if (filter === "Dernière semaine") {
    filteredDate.setDate(currentDate.getDate() - 7);
  } else if (filter === "Dernier mois") {
    filteredDate.setMonth(currentDate.getMonth() - 1);
  } else if (filter === "Dernière année") {
    filteredDate.setFullYear(currentDate.getFullYear() - 1);
  } else if (filter === "Dernier jour") {
    filteredDate = new Date();
  }

  const formattedDate = filteredDate.toISOString().split("T")[0];

  const queryEntrées = `
      SELECT SUM(pd.quantite) AS total_quantite
      FROM produit p
      JOIN produit_cf pd ON p.id = pd.id_produit
      JOIN commandef cf ON pd.id_cf = cf.id
      WHERE cf.etat = 'reçue' 
        AND (cf.date_reçue >= ? OR cf.date >= ?);
    `;

  const querySorties = `
      SELECT SUM(pc.quantite) AS total_quantite
      FROM produit p
      JOIN produit_cc pc ON p.id = pc.id_produit
      JOIN commandec cc ON pc.id_cc = cc.id
      WHERE cc.etat = 'livré' 
        AND (cc.date >= ? OR cc.date >= ?);
    `;

  db.query(queryEntrées, [formattedDate, formattedDate], (err, resultEntrées) => {
    if (err) return callback(err, null);

    db.query(querySorties, [formattedDate, formattedDate], (err, resultSorties) => {
      if (err) return callback(err, null);

      callback(null, {
        entrées: resultEntrées.length > 0 ? resultEntrées[0].total_quantite || 0 : 0,
        sorties: resultSorties.length > 0 ? resultSorties[0].total_quantite || 0 : 0,
      });
    });
  });
};
