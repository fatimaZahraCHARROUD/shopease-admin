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
    <div style={{ marginLeft: "300px", padding: "20px", fontFamily: "Arial" }}>
       <h3>Détails de la catégorie (produits associés) : <u>{name}</u></h3>
      <br />
      {categorie ? (
        <div>
          {categorie.length > 0 ? (
            <table className="table shadow">
              <thead className="table-light" >
                <tr>
                   <th>Image</th>
                  <th>Nom</th>
                  <th>Prix (DH)</th>
                  <th>Description</th>
                  <th>Quantité</th>
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
    </div></div>
  );
};

export default DetailsCategorie;
