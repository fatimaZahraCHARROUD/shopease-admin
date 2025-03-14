import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Facture = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate();

    useEffect(() => {
      if (!userId) {
        navigate('/signin');
      }
    }, [userId, navigate]);

  const [factures, setFactures] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term

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
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (factureId) => {
    if (activeDropdown === factureId) {
      setActiveDropdown(null); // Fermer le dropdown si on clique dessus à nouveau
    } else {
      setActiveDropdown(factureId); // Ouvrir le dropdown correspondant
    }
  };

  // Filter factures based on the search term
  const filteredFactures = factures.filter((facture) =>
    facture.facture_id.toString().includes(searchTerm)
  );

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      
      <div 
        className="content-area"
        style={{ 
          padding: "20px", 
          fontFamily: "Arial",
          marginLeft: "270px",
          transition: "margin-left 0.3s ease"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "30px",
            marginBottom: "30px",
            flexWrap: "wrap",
            gap: "10px"
          }}
        ><br/>
          {/* Champ de recherche */}
          <div className="input-group" style={{ 
            width: "960px",
            maxWidth: "100%"
          }}>
            <span className="input-group-text" style={{ color: "white", backgroundColor: "rgb(74,138,126)" }}>
              <i className="fa fa-search"></i>
            </span>
            <input
              type="text"
              placeholder="Rechercher par ID Facture..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control py-2"
            />
          </div>
  
          {/* Bouton Ajouter */}
          <Link
            to="/admin/add_facture"
            className="btn"
            style={{
              backgroundColor: "white",
              color: "rgb(74,138,126)",
              fontSize: "20px",
              padding: "5px 15px",
              borderRadius: "5px",
            }}
          >
            +
          </Link>
        </div>
  
        {/* Conteneur avec overflow pour le tableau */}
        <div style={{ 
          overflowX: "auto", 
          maxWidth: "100%", 
          boxShadow: "0 0 10px rgba(0,0,0,0.1)" 
        }}>
          <table className="table" style={{ borderCollapse: "collapse", minWidth: "800px" }}>
            <thead>
              <tr>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>ID Facture</th>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>ID Commande</th>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Prix Total</th>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Date</th>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Nom Fournisseur</th>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Email Fournisseur</th>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredFactures.map((facture) => (
                <tr key={facture.facture_id}>
                  <td>{facture.facture_id}</td>
                  <td>{facture.id_commandefournisseur}</td>
                  <td>{facture.prix_total} DH</td>
                  <td>{facture.date_facture && new Date(facture.date_facture).toLocaleDateString('fr-FR')}</td>
                  <td>{facture.fournisseur_nom}</td>
                  <td>{facture.fournisseur_email}</td>
                  <td>
                    <div className="dropdown" style={{ marginRight: "10px" }}>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => toggleDropdown(facture.facture_id)}
                        style={{
                          backgroundColor: "white",
                          padding: "5px 10px",
                          minWidth: "35px",
                        }}
                      >
                        ⋮
                      </button>
  
                      {activeDropdown === facture.facture_id && (
                        <ul
                          className="dropdown-menu show"
                          aria-labelledby={`dropdownMenuButton-${facture.facture_id}`}
                          style={{
                            minWidth: "10px",
                            marginRight: "10px",
                            padding: "0",
                          }}
                        >
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={() => navigate(`/admin/update_facture/${facture.facture_id}`)}
                              style={{ cursor: "pointer", padding: "10px 15px" }}
                            >
                              Modifier
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={() => handleDelete(facture.facture_id)}
                              style={{ cursor: "pointer", padding: "10px 15px" }}
                            >
                              Supprimer
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item cursor"
                              onClick={() => navigate(`/admin/details_facture/${facture.facture_id}`)}
                              style={{ cursor: "pointer", padding: "10px 15px" }}
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
    </div>
  );
};

export default Facture;
