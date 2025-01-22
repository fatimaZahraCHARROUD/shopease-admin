import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Update_facture = () => {
  const { id } = useParams(); // Récupère l'ID de la facture à modifier
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [prixTotal, setPrixTotal] = useState("");
  const [idCommandef, setIdCommandef] = useState("");
  const [commandesFournisseur, setCommandesFournisseur] = useState([]);

  // Charger les données de la facture à modifier
  const fetchFactureDetails = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8800/factures/${id}`);
      const facture = response.data;
  
      // Conversion de la date au format 'YYYY-MM-DD' si nécessaire
      const formattedDate = new Date(facture.date).toISOString().split("T")[0];
  
      setDate(formattedDate);
      setPrixTotal(facture.prixTotal);
      setIdCommandef(facture.id_commandef);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails de la facture :", error);
    }
  }, [id]);
  

  const fetchCommandesFournisseur = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8800/commandef");
      setCommandesFournisseur(response.data);
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
      await axios.put(`http://localhost:8800/factures/${id}`, {
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

  return (
    <div style={{ marginLeft:"180px"}} className="container mt-5">
      <h1>Modifier une Facture</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"style={{ width:"500px"}}
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Commande Fournisseur</label>
          <select
            className="form-control"style={{ width:"500px"}}
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
        <button type="submit" className="btn  " style={{ backgroundColor:"rgb(175, 76, 127)" , color:"white"}}>
          Modifier
        </button>
      </form>
    </div>
  );
};

export default Update_facture;