import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Commandec = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate(); 

  useEffect(() => {
    if (userId === "undefined" || userId === null) {
      // Si userId est null ou vide, rediriger vers /signin
      navigate('/signin');
    }
  }, [userId, navigate]);

  const [commandec, setCommandec] = useState([]);
  const [selectedLivreurs, setSelectedLivreurs] = useState({}); // Définir l'état pour les livreurs sélectionnés

  // Récupération des commandes
  const fetchCommandec = async () => {
    try {
      const response = await axios.get("http://localhost:8800/commandec");
      setCommandec(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des commandes :", err);
    }
  };

  useEffect(() => {
    fetchCommandec();
  }, []);

  // Gestion de la sélection du livreur
  const handleSelectChange = (commandeId, livreurId) => {
    setSelectedLivreurs((prev) => ({
      ...prev,
      [commandeId]: livreurId,
    }));
  };

  // Affecter ou modifier un livreur pour une commande
  const affecterLivreur = async (commandeId) => {
    const livreurId = selectedLivreurs[commandeId];
    if (!livreurId) {
      alert("Veuillez sélectionner un livreur.");
      return;
    }

    try {
      await axios.put(`http://localhost:8800/commandec/${commandeId}`, { id_livreur: livreurId, etat: "affecté" });
      alert("Livreur affecté avec succès !");
      fetchCommandec();
    } catch (err) {
      console.error("Erreur lors de l'affectation du livreur :", err);
    }
  };

  return (
    <div style={{marginLeft:"180px", padding: "20px", fontFamily: "Arial", backgroundColor: "#f4f4f4", borderRadius: "8px" }}>
      <h1 style={{ fontWeight: "bold", textAlign: "center", color: "rgb(175, 76, 101)" }}>
        Liste des commandes client
      </h1>
      <div className="users" style={{ marginTop: "20px" }}>
        {commandec.length > 0 ? (
          commandec.map((commande) => (
            <div key={commande.id} className="user" style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff" }}>
              <p style={{ color: "#666" }}>Date : {commande.date}</p>
              <p style={{ color: "#666" }}>Etat : {commande.etat}</p>
              <p style={{ color: "#666" }}>Livreur : {commande.nomcomplet} - {commande.email}</p>

              {commande.etat !== "livré" && (
                <button 
                  style={{
                    marginRight: "10px",
                    padding: "8px 12px",
                    backgroundColor: "rgb(175, 76, 101)",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  <Link
                    to={`/admin/update_commandec/${commande.id}`}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >  
                    Affecté
                  </Link> 
                </button>
              )}
              <br />
              <Link
                to={`/admin/produit_cc/${commande.id}`}
                style={{
                  color: "rgb(175, 76, 101)",
                }}
              >  
                Plus de détails
              </Link> 
              <hr />
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#888" }}>Aucune commande trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default Commandec;
