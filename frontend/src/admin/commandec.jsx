import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Commandec = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId === "undefined" || userId === null) {
      navigate('/signin');
    }
  }, [userId, navigate]);

  const [commandec, setCommandec] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // État pour le terme de recherche

  const fetchCommandec = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/commandec");
      setCommandec(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des commandes :", err);
    }
  };

  useEffect(() => {
    fetchCommandec();
  }, []);

  // Fonction pour gérer l'affichage du dropdown
  const [activeDropdown, setActiveDropdown] = useState(null); // Gestion de l'élément actif du dropdown

  const toggleDropdown = (factureId) => {
    if (activeDropdown === factureId) {
      setActiveDropdown(null); // Fermer le dropdown si on clique dessus à nouveau
    } else {
      setActiveDropdown(factureId); // Ouvrir le dropdown correspondant
    }
  };

  // Filtrage des commandes par ID
  const filteredCommandes = commandec.filter((commande) =>
    commande.id.toString().includes(searchTerm) // Recherche basée sur l'ID de la commande
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
          <div className="input-group" style={{ width: "980px" }}>
            <span className="input-group-text" style={{ color: "white", backgroundColor: "rgb(74,138,126)" }}>
              <i className="fa fa-search"></i> {/* Icône FontAwesome */}
            </span>
            <input
              type="text"
              placeholder="Rechercher par ID de commande..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control py-2"
            />
          </div>

        
        </div>
        <div style={{ 
      overflowX: "auto", 
      maxWidth: "100%", 
      boxShadow: "0 0 10px rgba(0,0,0,0.1)" 
    }}>
        {filteredCommandes.length > 0 ? (
          <table className="table shadow">
            <thead className="table-light">
              <tr style={{ backgroundColor: "#289dd2", color: "white" }}>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>ID</th>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Date</th>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Client</th>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Adresse</th>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>État</th>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Livreur</th>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}> </th>
              </tr>
            </thead>
            <tbody>
              {filteredCommandes.map((commande) => (
                <tr key={commande.id}>
                  <td>{commande.id}</td>
                  <td>{new Date(commande.date).toLocaleDateString("fr-FR")}</td>
                  <td>{commande.client_nom} -    {commande.client_email}</td>
                  <td>{commande.client_adresse}</td>
                  <td>
                    <span className={`badge ${commande.etat === "livré" ? "bg-success" : "bg-warning"}`}>
                      {commande.etat}
                    </span>
                  </td>
                  <td>{commande.liv_nom} - {commande.liv_email}</td>
                  <td style={{ position: "relative" }}>
                    {/* Menu déroulant avec trois points */}
                    <div className="dropdown">
                      <button
                        style={{
                          padding: "5px 10px",
                          minWidth: "35px", // Ajuste la largeur du bouton
                        }}
                        className="btn"
                        type="button"
                        onClick={() => toggleDropdown(commande.id)} // Toggle du dropdown
                      >
                        ⋮
                      </button>

                      {/* Liste déroulante */}
                      {activeDropdown === commande.id && (
                        <ul
                          className="dropdown-menu show"
                          style={{
                            minWidth: "150px",
                            position: "absolute",
                            right: "0",
                            top: "100%",
                            zIndex: "1000",
                            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          {commande.etat !== "livré" && (
                            <li>
                              <Link to={`/admin/update_commandec/${commande.id}`} className="dropdown-item">
                                Affecter
                              </Link>
                            </li>
                          )}
                          <li>
                            <Link to={`/admin/details_cc/${commande.id}`} className="dropdown-item">
                              Détails
                            </Link>
                          </li>
                        </ul>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center", color: "#888" }}>
            Aucune commande trouvée.
          </p>
        )}
      </div></div>
    </div>
  );
};

export default Commandec;
