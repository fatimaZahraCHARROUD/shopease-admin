import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Stock = () => {
  const idadmin = localStorage.getItem("adminId");
  const navigate = useNavigate();
  const [produits, setProduits] = useState([]); // Stocker les produits récupérés
  const [entries, setEntries] = useState(0); // Quantité des entrées
  const [exits, setExits] = useState(0); // Quantité des sorties
  const [filter, setFilter] = useState("Dernière semaine"); // Filtre sélectionné
  const [lowStockMessage, setLowStockMessage] = useState(""); // Message pour les produits en faible stock

  useEffect(() => {
    if (!idadmin) {
      navigate("/signin");
    }
  }, [idadmin, navigate]);

  // Fonction pour récupérer les produits et les données d'entrées/sorties
  const fetchStockAndData = async () => {
    try {
      if (idadmin) {
        // Récupération des produits
        const produitsResponse = await axios.get(`http://localhost:8800/api/stock`);
        setProduits(produitsResponse.data || []); // Mise à jour des produits ou tableau vide

        // Vérification des produits dont la quantité est inférieure à 5
        const lowStockProducts = produitsResponse.data.filter(
          (produit) => produit.quantite < 5
        );
        if (lowStockProducts.length > 0) {
          // Afficher un message si des produits ont une quantité inférieure à 5
          const productNames = lowStockProducts.map((produit) => produit.nom).join(", ");
          setLowStockMessage(`Produits avec une quantité inférieure à 5 : ${productNames}`);
        } else {
          setLowStockMessage(""); // Si aucun produit n'a un stock faible, cacher le message
        }

        // Récupération des entrées et sorties selon le filtre
        const response = await axios.get(`http://localhost:8800/api/es/${filter}`);
        if (response.data) {
          setEntries(response.data.entrées || 0);
          setExits(response.data.sorties || 0);
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
    <div style={{ backgroundColor: "#f8f9fa" }}>
      <div style={{ backgroundColor: "#f8f9fa", marginLeft: "280px", padding: "20px" }}>
        {/* Afficher le message d'alerte dans un div si nécessaire */}
        {lowStockMessage && (
          <div
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            <strong>Attention!</strong> {lowStockMessage}
          </div>
        )}

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
            justifyContent: "space-around",
            marginBottom: "20px",
          }}
        >
          <div
            className="shadow"
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "200px",
              width: "40%",
              backgroundColor: "white",
            }}
          >
            <h3 style={{ marginBottom: "10px", color: "black" }}>Quantité totale des entrées :</h3>
            <h3 style={{ marginTop: "50px", textAlign: "center", color: "#333" }}>{entries}</h3>
          </div>

          <div
            className="shadow"
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "200px",
              width: "40%",
              backgroundColor: "white",
            }}
          >
            <h3 style={{ marginBottom: "10px", color: "black" }}>Quantité totale des sorties :</h3>
            <h3 style={{ marginTop: "50px", textAlign: "center", color: "#333" }}>{exits}</h3>
          </div>
        </div>

        <hr style={{ borderTop: "2px solid #ddd" }} />

        {produits.length > 0 ? (
          <table className="table shadow">
            <thead className="table-light">
              <tr>
                <th style={{ color: " rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>
                  Image
                </th>
                <th style={{ color: " rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>
                  Nom du Produit
                </th>
                <th style={{ color: " rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>
                  Quantité
                </th>
                <th style={{ color: " rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>
                  Prix
                </th>
                <th style={{ color: " rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>
                  Dépot adresse
                </th>
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
                  <td>{produit.prix} DH</td>
                  <td>{produit.adresse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucun produit trouvé dans le stock.</p>
        )}
      </div>
    </div>
  );
};

export default Stock;
