import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; 

const Update_categorie = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate();
  const { id } = useParams();

  const [categorie, setcategorie] = useState({ nom: "", imgurl: "" });

  useEffect(() => {
    if (!userId) {
      navigate('/signin');
    }
  }, [userId, navigate]);

  useEffect(() => {
    const fetchcategorie = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/categorie/${id}`);
        console.log("Données récupérées :", response.data);
        setcategorie(response.data || { nom: "", imgurl: "" });
      } catch (err) {
        console.error("Erreur lors de la récupération des données de catégorie :", err);
      }
    };

    fetchcategorie();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcategorie((prevcategorie) => ({
      ...prevcategorie,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/api/categorie/${id}`, categorie);
      alert("Catégorie modifiée avec succès !");
      navigate("/admin/categorie");
    } catch (err) {
      console.error("Erreur lors de la mise à jour de catégorie :", err);
    }
  };

  if (!categorie) {
    return <p>Chargement des données...</p>;
  }

  return (     <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
    <div style={{
      width: "100%",
      maxWidth: "600px", // Largeur max du formulaire
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "white",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
    }}>  <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Mettre à jour la catégorie</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom</label>
            <input className="form-control" type="text" placeholder="Nom" name="nom" value={categorie.nom} onChange={handleChange} required />

            <label className="form-label">Image URL</label>
            <input className="form-control" type="text" placeholder="URL" name="imgurl" value={categorie.imgurl} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn w-100" style={{ backgroundColor: "rgb(74,138,126)", color: "white", fontWeight: "bold" }}>Mettre à jour</button>
        </form>
      </div>
    </div> 
  );
};

export default Update_categorie;
