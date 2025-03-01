import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Update_facture = () => {
  const { id } = useParams(); // Récupère l'ID de la facture à modifier
  const navigate = useNavigate();

  const [date, setDate] = useState('');
  const [prixTotal, setPrixTotal] = useState('');
  const [idCommandef, setIdCommandef] = useState('');
  const [commandesFournisseur, setCommandesFournisseur] = useState([]);

  // Charger les données de la facture à modifier
  const fetchFactureDetails = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/factures/${id}`);
      const facture = response.data;
  
      console.log("Données de la facture reçues :", facture); // Debug
  
      if (!facture.date) {
        console.warn("⚠️ Aucune date trouvée pour cette facture !");
        setDate(""); // Évite d'essayer de formater une date null
      } else {
        setDate(new Date(facture.date).toISOString().split("T")[0]);
      }
  
      setPrixTotal(facture.prixTotal);
      setIdCommandef(facture.id_commandef);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails de la facture :", error);
    }
  }, [id]);
  
  

  const fetchCommandesFournisseur = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/commandef");
      console.log("Commandes fournisseur reçues :", response.data); // 🔍 Vérification des données
      setCommandesFournisseur(response.data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes fournisseur :", error);
    }
  }, []);

  useEffect(() => {
    fetchFactureDetails();
    fetchCommandesFournisseur();
  }, [fetchFactureDetails, fetchCommandesFournisseur]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/api/factures/${id}`, {
        date,
        prixTotal,
        id_commandef: idCommandef,
      });
      alert("Facture modifiée avec succès !");
      navigate("/admin/facture"); // Redirection vers la liste des factures après modification
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la facture :", error);
      alert("Une erreur est survenue lors de la modification.");
    }
  };
  
  return (    <div style={{ backgroundColor: "#f8f9fa",}}>

    <div style={{ marginLeft: "230px",backgroundColor: "#f8f9fa", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div style={{
        width: "60%",
        padding: "80px",
        borderRadius: "8px",
        backgroundColor: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
    }}>
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}> Mettre à jour une Facture</h2>
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
            value={idCommandef}
            onChange={(e) => setIdCommandef(e.target.value)}
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
        <button type="submit" className="btn w-100 " style={{ backgroundColor:"rgb(74,138,126)" , color:"white"}}>
        Mettre à jour
        </button>
      </form>
    </div></div>
    </div>
  );
};

export default Update_facture;