import { getClients, getClientById, updateClient } from "../models/ClientModel.js";

// Récupérer tous les client
export const getAllClients = (req, res) => {
  getClients((err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

// Récupérer un client par ID
export const getClient = (req, res) => {
  const employeId = req.params.id;
  getClientById(employeId, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({ message: "client introuvable" });
    return res.json(data[0]);
  });
};


// Mettre à jour un client
export const updateClientById = (req, res) => {
  const clientId = req.params.id;
  updateClient(clientId, req.body, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) return res.status(404).json({ message: "Client introuvable" });
    return res.json({ message: "Client mis à jour avec succès !" });
  });
};