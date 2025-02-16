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
  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div style={{ marginLeft: "300px", padding: "20px", fontFamily: "Arial" }}>
        <h1 style={{ fontWeight: "bold", textAlign: "center", color: "black", marginTop: "20px", marginBottom: "80px" }}>
          Liste des commandes clients
        </h1>
        {commandec.length > 0 ? (
          <table className="table shadow">
            <thead className="table-light">
              <tr style={{ backgroundColor: "#289dd2", color: "white" }}>
                <th>ID</th>
                <th>Date</th>
                <th>État</th>
                <th>Livreur</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {commandec.map((commande) => (
                <tr key={commande.id}>
                  <td>{commande.id}</td>
                  <td>{new Date(commande.date).toLocaleDateString("fr-FR")}</td>
                  <td>
                  <span className={`badge ${commande.etat === "livré" ? "bg-success" : "bg-warning"}`}>
                    {commande.etat}
                  </span>

                     
                  </td>
                  <td>{commande.nomcomplet} - {commande.email}</td>
                  <td style={{ position: "relative" }}>
      {/* Menu déroulant avec trois points */}
      <div className="dropdown">
        <button
  style={{
    padding: "5px 10px",
    minWidth: "35px", // Ajuste la largeur du bouton
  }}
  className="btn btn-secondary"          type="button"
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
                <Link
                  to={`/admin/update_commandec/${commande.id}`}
                  className="dropdown-item"
                >
                  Affecter
                </Link>
              </li>
            )}
            <li>
              <Link
                to={`/admin/details_cc/${commande.id}`}
                className="dropdown-item"
              >
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

      </div>
    </div>
  );
};

export default Commandec;
