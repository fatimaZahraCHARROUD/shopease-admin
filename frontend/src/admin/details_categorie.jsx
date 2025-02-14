import React, { useState, useEffect } from "react";
import { useParams, Link ,useNavigate} from "react-router-dom";
import axios from "axios";

const details_categorie = () => {
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
    <div style={{ marginLeft:"350px"}} className="container mt-5">
      <h3>Détails de la catégorie (produits associés ):<u>{name  }</u> </h3><br/>
      {categorie ? (
        <div>
            {categorie.length > 0 ? (
          categorie.map((c) => (
            <div  style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* Image */}
                <img 
                  src={c.imgurl  } // Si produit.img est vide, affiche une image par défaut
                  alt={c.nom}
                  style={{ width: '100px', height: '100px', marginRight: '15px' }} 
                />
                
                <div>
                  {/* Nom et prix */}
                  <strong>{c.nom}</strong> - {c.prix}€
                  <p>Description: {c.description}</p>
                  <p>Quantité: {c.quantite}</p>
                   
                </div>
              </div>
              <hr/></div> 
          ) )): (
            <p>Aucun produit associé à cette catégorie.</p>
          )}
         </div>
      ) : (
        <p>Catégorie non trouvée</p>
      )}
    </div>
  );
};

export default details_categorie;
