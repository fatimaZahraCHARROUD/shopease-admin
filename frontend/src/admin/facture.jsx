import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Facture = () => {
  const [factures, setFactures] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFactures();
  }, []);

  const fetchFactures = async () => {
    try {
      const response = await axios.get("http://localhost:8800/factures");
      setFactures(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des factures :", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette facture ?")) return;

    try {
      await axios.delete(`http://localhost:8800/factures/${id}`);
      alert("Facture supprimée avec succès !");
      fetchFactures(); // Rechargez la liste des factures après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression de la facture :", error);
      alert("Une erreur est survenue lors de la suppression.");
    }
  };

  return (
    <div style={{ marginLeft:"180px"}} className="container mt-5">
      <h1>Liste des Factures</h1>
      <button
        className="btn   mb-3"  style={{ backgroundColor:"rgb(175, 76, 127)" , color:"white"}}
        onClick={() => navigate("/admin/add_facture")}
      >
        Ajouter une facture
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID Commande Fournisseur</th>
           
            <th>Prix Total</th>
            <th>Date</th>
            <th>Nom Fournisseur</th>
            <th>Email Fournisseur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {factures.map((facture) => (
            <tr key={facture.facture_id}>
              <td>{facture.id_commandefournisseur}</td>
              
              <td>{facture.prix_total} €</td>
              <td>{facture.date_facture && new Date(facture.date_facture).toLocaleDateString('fr-FR') }</td> 
              <td>{facture.fournisseur_nom}</td>
              <td>{facture.fournisseur_email}</td>
              <td>
                <button
                  className="btn   me-2"  style={{ backgroundColor:"rgb(175, 76, 127)" , color:"white"}}
                  onClick={() => navigate(`/admin/update_facture/${facture.facture_id}`)}
                >
                  Modifier
                </button>
                <button
                  className="btn "  style={{ border:"1px solid rgb(175, 76, 127) ",backgroundColor:"white" , color:"rgb(175, 76, 127)"}}
                  onClick={() => handleDelete(facture.facture_id)}
                >
                  Supprimer
                </button>
                <button
                  className="btn  " style={{  backgroundColor:"white" , color:"rgb(175, 76, 127)"}}
                  onClick={() => navigate(`/admin/details_facture/${facture.facture_id}`)}
                >
                <u> Details</u> 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Facture;