import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Stock = () => {
  const idadmin = localStorage.getItem("adminId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!idadmin) {
      // Si idGdepot est null ou vide, rediriger vers /signin
      navigate("/signin");
    }
  }, [idadmin, navigate]);

  const [produits, setProduits] = useState([]); // Stocker les produits récupérés
  const [entries, setEntries] = useState(0); // Quantité des entrées
  const [exits, setExits] = useState(0); // Quantité des sorties
  const [filter, setFilter] = useState("Dernière semaine"); // Filtre sélectionné

  // Fonction pour récupérer les produits et les données d'entrées/sorties
  const fetchStockAndData = async () => {
    try {
      if (idadmin) {
        // Récupération des produits
        const produitsResponse = await axios.get(`http://localhost:8800/api/stock`);
        setProduits(produitsResponse.data || []); // Mise à jour des produits ou tableau vide

        // Récupération des entrées et sorties selon le filtre
        const response = await axios.get(`http://localhost:8800/api/es/${filter}`
        );

        if (response.data) {
          setEntries(response.data.entrées || 0); // Mettre à jour les entrées
          setExits(response.data.sorties || 0); // Mettre à jour les sorties
        } else {
          console.warn("Aucune donnée pour les entrées et sorties.");
        }
      } else {
        console.log("ID du dépôt non trouvé dans le localStorage.");
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des produits ou des entrées/sorties:", err);
    }
  };

  // Appel de la fonction fetchStockAndData lors du montage du composant ou du changement de filtre
  useEffect(() => {
    fetchStockAndData();
  }, [idadmin, filter]);

  return (
    <div style={{ marginLeft:"350px" ,padding: "20px" }}>
      <div className="filter-section" style={{ marginBottom: "20px" }}>
        <label htmlFor="filter-select" style={{ marginRight: "10px", fontWeight: "bold" }}>
          Filtrer par :
        </label>
        <select
          id="filter-select"
          style={{
            padding: "5px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Dernier jour">Dernier jour</option>
          <option value="Dernière semaine">Dernière semaine</option>
          <option value="Dernier mois">Dernier mois</option>
          <option value="Dernière année">Dernière année</option>
        </select>
      </div>

      <div
        className="entries-exit"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            height:"300px",
            width: "48%",
            backgroundColor: "#f8f9fa",
          }}
        >
           <h1 style={{   marginBottom: "10px", color: "black" }}>Quantité totale des entrées :</h1>
          <h1 style={{ marginTop:"50px" ,textAlign:"center", color: "#333" }}>{entries}</h1> 

        </div>

        <div
          style={{
           
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            height:"300px",
            width: "48%",
            backgroundColor: "#f8f9fa",
          }}
        >
          <h1 style={{   marginBottom: "10px", color: "black" }}>Quantité totale des sorties :</h1>
           <h1 style={{ marginTop:"50px" ,textAlign:"center", color: "#333" }}>{exits}</h1> 
        </div>
      </div>

      <hr style={{ borderTop: "2px solid #ddd" }} />

      <h1>Produits dans le Stock  </h1>
      {produits.length > 0 ? (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Image</th>
              <th>Nom du Produit</th>
              <th>Quantité</th>
              <th>Prix</th>
              <th>Dépot  adresse</th>
            </tr>
          </thead>
          <tbody>
            {produits.map((produit) => (
              <tr key={produit.id}>
                <td>
                  <img
                    src={produit.imgurl}
                    width="100px"
                    height="100px"
                    alt={produit.nom}
                  />
                </td>
                <td>{produit.nom}</td>
                <td>
                  <strong
                    style={{
                      color: produit.quantite < 5 ? "red" : "green",
                      fontSize: 18,
                    }}
                  >
                    {produit.quantite}
                  </strong>
                </td>
                <td>{produit.prix}€</td>
                <td>{produit.adresse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun produit trouvé dans le stock.</p>
      )}
    </div>
  );
};

export default Stock;
