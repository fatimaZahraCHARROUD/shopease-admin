import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate} from "react-router-dom"; // Corriger l'importation de Link

const Add_facture = () => {
          const navigate = useNavigate(); 
    
  const [date, setDate] = useState(""); // Stocke la date de la facture
  const [prixTotal, setPrixTotal] = useState(0); // Prix total calculé
  const [commandesFournisseur, setCommandesFournisseur] = useState([]); // Liste des commandes fournisseur
  const [selectedCommandef, setSelectedCommandef] = useState(""); // ID de la commande fournisseur sélectionnée

  useEffect(() => {
    fetchCommandesFournisseur(); // Récupère les commandes fournisseur lors du montage du composant
  }, []);

  // Fonction pour récupérer la liste des commandes fournisseur
  const fetchCommandesFournisseur = async () => {
  try {
    const response = await axios.get("http://localhost:8800/api/commandef"); // Nouvelle route sans ":id"
    setCommandesFournisseur(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes fournisseur :", error);
  }
};

  // Fonction pour récupérer les produits associés à une commande et calculer le prix total
  const fetchProduitsAndCalculateTotal = async (idCommandef) => {
    try {
      const response = await axios.get(`http://localhost:8800/api/commandesf/${idCommandef}/produits`);
      const produits = response.data;

      // Calculer le prix total (prix unitaire * quantité pour chaque produit)
      const total = produits.reduce((sum, produit) => 
        sum + Number(produit.prix) * Number(produit.quantite), 0
      );
            setPrixTotal(total); // Met à jour le prix total
    } catch (error) {
      console.error("Erreur lors de la récupération des produits de la commande :", error);
      setPrixTotal(0); // Réinitialise en cas d'erreur
    }
  };

  // Gestion du changement de commande fournisseur
  const handleCommandefChange = (e) => {
    const id = e.target.value;
    setSelectedCommandef(id); // Met à jour l'ID de la commande sélectionnée
    if (id) {
      fetchProduitsAndCalculateTotal(id); // Calculer le prix total pour cette commande
    } else {
      setPrixTotal(0); // Réinitialise si aucune commande n'est sélectionnée
    }
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    try {
      await axios.post("http://localhost:8800/api/factures", {
        date,
        prixTotal,
        id_commandef: selectedCommandef,
      });
      alert("Facture ajoutée avec succès !");
      // Réinitialiser les champs du formulaire
      setDate("");
      setPrixTotal(0);
      setSelectedCommandef("");
      navigate("/admin/facture")
    } catch (error) {
      console.error("Erreur lors de l'ajout de la facture :", error);
      alert("Une erreur est survenue lors de l'ajout de la facture.");
    }
  };

  return (
    <div style={{ marginLeft: "230px",backgroundColor: "#f8f9fa", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div style={{
        width: "60%",
        padding: "80px",
        borderRadius: "8px",
        backgroundColor: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
    }}>
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Ajouter une Facture</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control w-100"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Commande Fournisseur</label>
          <select
            className="form-control w-100" 
            value={selectedCommandef}
            onChange={handleCommandefChange}
            required
          >
            <option value="">Sélectionnez une commande fournisseur</option>
            {commandesFournisseur.map((commande) => (
              <option key={commande.id} value={commande.id}>
                Commande ID: {commande.id}
              </option>
            ))}
          </select>
        </div>
         
        <button type="submit" className="btn w-100" style={{ backgroundColor: "black", color: "white", fontWeight: "bold" }}>
          Ajouter
        </button>
      </form>
    </div>
    </div>
  );
};

export default Add_facture;