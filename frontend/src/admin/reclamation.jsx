import React, { useState, useEffect } from "react";
import axios from "axios";

function Reclamation() {
  const [reclamations, setReclamations] = useState([]);

  // Fonction pour récupérer les réclamations depuis l'API
  useEffect(() => {
    axios.get("http://localhost:8800/api/reclamations") // Remplace par ton URL
      .then(response => {
        setReclamations(response.data); // Stocker les données
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des réclamations:", error);
      });
  }, []);

  return (<div style={{ backgroundColor: "#f8f9fa",}}>
    <div style={{backgroundColor: "#f8f9fa", marginLeft: "260px", padding: "20px", minHeight:"800px" }}>
      <h4 style={{ marginBottom: "20px" , color:" rgb(74,138,126)" }}>Réclamations des utilisateurs</h4>
      
      {reclamations.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {reclamations.map((rec) => (
            <div key={rec.id} style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "white",
              boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)"
            }}>
              <h5 style={{ margin: "0 0 5px 0", color: "rgb(74,138,126)" }}>{rec.nomcomplet} - {rec.email}</h5>
              <p style={{ margin: "5px 0", fontSize: "16px", color: "#555" }}>{rec.msg}</p>
              <small style={{ color: "#888" }}>🗓 {new Date(rec.date).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>Aucune réclamation trouvée</p>
      )}
    </div></div>
  );
}

export default Reclamation;
