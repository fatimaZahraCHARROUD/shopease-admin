import { getEmployes, getEmployeById, addEmploye, updateEmploye, deleteEmploye } from "../models/EmployeModel.js";

// Récupérer tous les employés
export const getAllEmployes = (req, res) => {
  getEmployes((err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

// Récupérer un employé par ID
export const getEmploye = (req, res) => {
  const employeId = req.params.id;
  getEmployeById(employeId, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({ message: "Employé introuvable" });
    return res.json(data[0]);
  });
};

// Ajouter un nouvel employé
export const createEmploye = (req, res) => {
  addEmploye(req.body, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Employé ajouté avec succès !" });
  });
};

// Mettre à jour un employé
export const updateEmployeById = (req, res) => {
  const employeId = req.params.id;
  updateEmploye(employeId, req.body, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) return res.status(404).json({ message: "Employé introuvable" });
    return res.json({ message: "Employé mis à jour avec succès !" });
  });
};

// Supprimer un employé
export const deleteEmployeById = (req, res) => {
  const employeId = req.params.id;
  deleteEmploye(employeId, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) return res.status(404).json({ message: "Employé introuvable" });
    return res.json({ message: "Employé supprimé avec succès !" });
  });
};
