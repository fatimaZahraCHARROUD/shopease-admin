import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DetailsCategorie = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId === "undefined" || userId === null) {
      // Si userId est null ou vide, rediriger vers /signin
      navigate('/signin');
    }
  }, [userId, navigate]);

  const { id } = useParams(); // Récupérer l'ID depuis les paramètres de l'URL
  const [categorie, setCategorie] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchCategorieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/categorie_details/${id}`);
        setCategorie(response.data);

        const response2 = await axios.get(`http://localhost:8800/api/categorie/${id}`);
        setName(response2.data[0].nom); 
      } catch (err) {
        console.error("Erreur lors de la récupération des détails :", err);
      }
    };

    fetchCategorieDetails();
  }, [id]);

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
      ><br/>  <h3 style={{ color: "rgb(74,138,126)"}} >Produits associés  </h3>
      <br />
      {categorie ? (
       <div style={{ 
        overflowX: "auto", 
        maxWidth: "100%", 
        boxShadow: "0 0 10px rgba(0,0,0,0.1)" 
      }}>

          {categorie.length > 0 ? (
            <table className="table shadow">
              <thead className="table-light" >
                <tr>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Image</th>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Nom</th>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Prix (DH)</th>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Description</th>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Quantité</th>
                </tr>
              </thead>
              <tbody>
                {categorie.map((c, index) => (
                  <tr key={c.id}>
                     <td>
                      <img
                        src={c.imgurl} // Si produit.img est vide, affiche une image par défaut
                        alt={c.nom}
                        style={{ width: '50px', height: '50px' }}
                      />
                    </td>
                    <td>{c.nom}</td>
                    <td>{c.prix}</td>
                    <td>{c.description}</td>
                    <td>{c.quantite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucun produit associé à cette catégorie.</p>
          )}
        </div>
      ) : (
        <p>Aucun produit associé à cette catégorie.</p>
      )}
    </div></div></div>
  );
};

export default DetailsCategorie;
