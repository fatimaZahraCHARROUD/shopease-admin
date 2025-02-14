import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateFournisseur = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/signin');
    }
  }, [userId, navigate]);

  const { id } = useParams();
  const [fournisseur, setFournisseur] = useState({
    nomcomplet: "",
    email: "",
    tel: "",
    adresse: "",
  });

  useEffect(() => {
    const fetchFournisseur = async () => { 
      try {
        const response = await axios.get(`http://localhost:8800/api/fournisseur/${id}`);
        setFournisseur(response.data || {});
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
      }
    };
    fetchFournisseur();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFournisseur((prevFournisseur) => ({
      ...prevFournisseur,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/api/fournisseur/${id}`, fournisseur);
      alert("Fournisseur mis à jour avec succès !");
      navigate("/admin/fournisseur");
    } catch (err) {
      console.error("Erreur lors de la mise à jour du fournisseur :", err);
    }
  };

  if (!fournisseur || Object.keys(fournisseur).length === 0) {
    return <p className="text-center mt-5">Chargement des données...</p>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <div className="card p-4 shadow-lg" style={{ width: "600px", borderRadius: "10px", backgroundColor: "white", padding:"40px" }}>
        <h2 className="text-center mb-4" style={{ color: "black" }}>Mettre à jour un Fournisseur</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Nom Complet</label>
            <input type="text" className="form-control" placeholder="Nom" name="nomcomplet" value={fournisseur.nomcomplet} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input type="email" className="form-control" placeholder="Email" name="email" value={fournisseur.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Téléphone</label>
            <input type="text" className="form-control" placeholder="Téléphone" name="tel" value={fournisseur.tel} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Adresse</label>
            <input type="text" className="form-control" placeholder="Adresse" name="adresse" value={fournisseur.adresse} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: "#289dd2", fontSize: "16px", fontWeight: "bold" }}>
            Mettre à jour
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFournisseur;
