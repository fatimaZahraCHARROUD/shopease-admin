import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategorie = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/signin');
    }
  }, [userId, navigate]);
  
  const [categorie, setCategorie] = useState({ nom: "", imgurl: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Vérification des champs requis
    if (!categorie.nom.trim() || !categorie.imgurl.trim()) {
      alert("Tous les champs sont obligatoires !");
      return;
    }
  
    try {
      // Envoi de la requête POST
      await axios.post("http://localhost:8800/api/categorie", {
        nom: categorie.nom,
        imgurl: categorie.imgurl,
      });
      alert("Catégorie ajoutée avec succès !");
      
      // Réinitialisation de l'état du formulaire
      setCategorie({ nom: "", imgurl: "" });
  
      // Redirection vers la liste des catégories
      navigate("/admin/categorie");
    } catch (err) {
      console.error("Erreur lors de l'ajout de la catégorie :", err);
      alert("Une erreur est survenue lors de l'ajout de la catégorie. Veuillez réessayer.");
    }
  };
  
  // Gestion des changements dans les champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategorie((prevCategorie) => ({
      ...prevCategorie,
      [name]: value,
    }));
  };
  

  return (    <div style={{ backgroundColor: "#f8f9fa",}}>

    <div style={{  marginLeft:"250px" ,backgroundColor: "#f8f9fa", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        width: "700px", minHeight:"500px",
        padding: "40px",
        borderRadius: "8px",
        backgroundColor: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
      }}>
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Ajoutez une Catécorie</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom</label>
            <input
              name="nom"
              className="form-control"
              value={categorie.nom}
              onChange={handleChange}
              required
            />
                        <label className="form-label">Image Url</label>

            <input
            name="imgurl"
            className="form-control"
            value={categorie.imgurl}
            onChange={handleChange}
            required
          />
               
          </div>
 

          <button
            type="submit"
            className="btn w-100  "
            style={{   backgroundColor: "rgb(74,138,126)", color: "white", fontWeight: "bold" }}
           
          >
            Ajoutez
          </button>
        </form>
      </div>
    </div></div>
  );
};

export default AddCategorie;
