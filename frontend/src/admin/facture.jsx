import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Facture = () => {
  const [factures, setFactures] = useState([]);
   const navigate = useNavigate();

  useEffect(() => {
    fetchFactures();
  }, []);

  const fetchFactures = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/factures");
      setFactures(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des factures :", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette facture ?")) return;

    try {
      await axios.delete(`http://localhost:8800/api/factures/${id}`);
      alert("Facture supprimée avec succès !");
      fetchFactures(); // Rechargez la liste des factures après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression de la facture :", error);
      alert("Une erreur est survenue lors de la suppression.");
    }
  };

  // Fonction pour gérer l'affichage du dropdown
  const [activeDropdown, setActiveDropdown] = useState(null); // Gestion de l'élément actif du dropdown

  const toggleDropdown = (factureId) => {
    if (activeDropdown === factureId) {
      setActiveDropdown(null); // Fermer le dropdown si on clique dessus à nouveau
    } else {
      setActiveDropdown(factureId); // Ouvrir le dropdown correspondant
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div style={{ marginLeft: "300px", padding: "20px", fontFamily: "Arial" }}>
        <h1 style={{ fontWeight: "bold", textAlign: "center", color: "black", marginTop: "20px" }}>Liste des Factures</h1>
        <button
          className="btn shadow mb-3 mt-5"
          style={{ backgroundColor: "white", color: "black" }}
          onClick={() => navigate("/admin/add_facture")}
        >
          Ajouter une facture
        </button>
        <table className="table   shadow" style={{ borderCollapse: "collapse" }}>
          <thead className="table-light">
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
                <td>{facture.date_facture && new Date(facture.date_facture).toLocaleDateString('fr-FR')}</td>
                <td>{facture.fournisseur_nom}</td>
                <td>{facture.fournisseur_email}</td>
                <td>
                  {/* Menu déroulant avec trois points */}
                  <div className="dropdown" style={{ marginRight:"40px"}}>
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => toggleDropdown(facture.facture_id)} // Toggle du dropdown
                      style={{
                        padding: "5px 10px",
                        minWidth: "35px", // Ajuste la largeur du bouton
                      }}
                    >
                      ⋮
                    </button>

                    {/* Liste déroulante */}
                    {activeDropdown === facture.facture_id && (
                      <ul
                        className="dropdown-menu show"
                        aria-labelledby={`dropdownMenuButton-${facture.facture_id}`}
                        style={{
                          minWidth: "10px", // Ajuster la largeur du menu déroulant
                          marginRight: "10px",  // Enlever toute marge droite indésirable
                          padding: "0", // Enlever le padding inutile
                        }}
                      >
                        <li>
                          <a
                            className="dropdown-item"
                            onClick={() => navigate(`/admin/update_facture/${facture.facture_id}`)}
                             style={{ cursor:"pointer",
                              padding: "10px 15px",
                            }}
                          >
                            Modifier
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            onClick={() => handleDelete(facture.facture_id)}
                            style={{ cursor:"pointer",
                              padding: "10px 15px",
                            }}
                          >
                            Supprimer
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item cursor"
                            onClick={() => navigate(`/admin/details_facture/${facture.facture_id}`)}
                             style={{ cursor:"pointer",
                              padding: "10px 15px",
                            }}
                          >
                            <u>Détails</u>
                          </a>
                        </li>
                      </ul>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Facture;
