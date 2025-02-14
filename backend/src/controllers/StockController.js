import { getStock, getStockHistory } from "../models/StockModel.js";

// Récupérer tous les produits du stock
export const getAllStock = (req, res) => {
  getStock((err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

// Récupérer l'historique des entrées et sorties de stock avec un filtre
export const getStockByFilter = (req, res) => {
  const filter = req.params.filter;

  getStockHistory(filter, (err, data) => {
    if (err) return res.status(400).json(err);
    return res.json(data);
  });
};
