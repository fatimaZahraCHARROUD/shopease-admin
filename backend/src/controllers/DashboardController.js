import { getTotalAchatsQuery,getAllClientsByCity, getTotalVentes, getTopCategories, getSalesData, getTotalClients, Fournisseur, getVentesParMois, getClientsPerMonth } from "../models/dashboardModel.js";

// Récupérer le total des achats
export const getTotalAchats = (req, res) => {
  getTotalAchatsQuery((err, data) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", error: err });
    return res.json(data[0]); // Retourne le total des achats
  });
};


// Récupérer le total des ventes (NOUVEAU)
export const getTotalVentesController = (req, res) => {
  getTotalVentes((err, data) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", error: err });
    return res.json({ totalVentes: data[0].totalVentes || 0 });
  });
};


export const topCategories = (req, res) => {
  const { annee } = req.query;
  
  if (!annee) {
    return res.status(400).json({ message: "L'année est requise pour le filtrage" });
  }

  getTopCategories(annee, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Erreur serveur", error: err });
    }
    res.json(results);
  });
};



// Fonction qui gère la récupération des ventes par mois
export const getSalesByMonth = (req, res) => {
  const { year } = req.query;

  // Vérification de l'année passée en paramètre
  if (!year || isNaN(year)) {
    return res.status(400).json({ message: "L'année est requise et doit être un nombre valide." });
  }

  // Calcul des 5 dernières années (l'année actuelle et les 4 précédentes)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  // Conversion des années en une chaîne ['?', '?', '?', '?', '?'] pour la requête SQL préparées ex : SELECT * FROM ventes WHERE annee IN (?, ?, ?, ?, ?);
  const yearsPlaceholder = years.map(() => '?').join(',');

  // Récupération des données de ventes pour ces années via le modèle
  getSalesData(years, yearsPlaceholder, (err, results) => {
    if (err) {
      console.error("Erreur SQL :", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    // Envoi des résultats sous format JSON
    res.json(results);
  });
};





//TOTAL DES clients
export const totalClients = (req, res) => {
  getTotalClients((err, result) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de la récupération du total des clients" });
    } else {
      res.json(result);
    }
  });
};

//TOTAL DES FOURNISSEURS
export const getTotalFournisseurs = (req, res) => {
  Fournisseur.getTotalFournisseurs((err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erreur lors de la récupération du total des fournisseurs" });
    }
    res.json(data);
  });
};



export const getVentes = (req, res) => {
  const annee = req.query.annee || new Date().getFullYear();

  getVentesParMois(annee, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

//total des clients par month 
export const clientsPerMonth = (req, res) => {
  let { annee } = req.query;

  // Vérifier si l'année est fournie et est un nombre valide
  if (!annee || isNaN(annee)) {
    return res.status(400).json({ message: "Une année valide est requise pour le filtrage" });
  }

  annee = parseInt(annee, 10); // Convertir en entier pour éviter des erreurs SQL

  getClientsPerMonth(annee, (err, results) => {
    if (err) {
      console.error("Erreur serveur :", err);
      return res.status(500).json({ message: "Erreur serveur", error: err });
    }
    return res.json(results);
  });
};


//total client par city
export const getClientsByCity = (req, res) => {
    const year = req.query.year; // Récupération de l'année depuis le frontend
    
    getAllClientsByCity(year, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  };