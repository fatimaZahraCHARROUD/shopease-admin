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

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div style={{ marginLeft: "300px", padding: "20px", fontFamily: "Arial" }}>
        <h1 style={{ fontWeight: "bold", textAlign: "center", color: "black", marginTop: "20px", marginBottom: "80px" }}>
          Liste des commandes clients
        </h1>
        {commandec.length > 0 ? (
          <table className="table table-bordered">
            <thead className="table-light">
              <tr style={{ backgroundColor: "#289dd2", color: "white" }}>
                <th>ID</th>
                <th>Date</th>
                <th>État</th>
                <th>Livreur</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {commandec.map((commande) => (
                <tr key={commande.id}>
                  <td>{commande.id}</td>
                  <td>{new Date(commande.date).toLocaleDateString("fr-FR")}</td>
                  <td>
                    <span style={{
                      padding: "5px 10px",
                      borderRadius: "5px",
                      color: "white",
                      backgroundColor: commande.etat === "livré" ? "green" : "orange"
                    }}>
                      {commande.etat}
                    </span>
                  </td>
                  <td>{commande.nomcomplet} - {commande.email}</td>
                  <td>
                    {commande.etat !== "livré" && (
                      <Link
                        to={`/admin/update_commandec/${commande.id}`}
                        className="btn"
                        style={{
                          backgroundColor: "#289dd2",
                          color: "white",
                          marginRight: "10px"
                        }}
                      >
                        Affecter
                      </Link>
                    )}
                    <Link
                      to={`/admin/produit_cc/${commande.id}`}
                      className="btn btn-outline-dark"
                    >
                      Détails
                    </Link>
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
