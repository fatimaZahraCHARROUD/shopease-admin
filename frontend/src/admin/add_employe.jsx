import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmploye = () => {
    const userId = localStorage.getItem("adminId");
    const navigate = useNavigate();
    const [employe, setEmploye] = useState({
        nomcomplet: "",
        email: "",
        adresse: "",
        ville: "",
        password: "",
        tel: "",
    });

    useEffect(() => {
        if (!userId) {
            navigate('/signin');
        }
    }, [userId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmploye((prevEmploye) => ({
            ...prevEmploye,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8800/api/employe', employe);
            alert('Employé ajouté avec succès !');
            navigate('/admin/employe');
        } catch (err) {
            console.error("Erreur lors de l'ajout de l'employé", err);
            alert("Une erreur est survenue lors de l'ajout.");
        }
    };

    return (    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
        <div style={{
          width: "100%",
          maxWidth: "600px", // Largeur max du formulaire
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
        }}>
                <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Ajouter un Livreur</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nom Complet</label>
                        <input type="text" className="form-control" name="nomcomplet" value={employe.nomcomplet} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={employe.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Adresse</label>
                        <input type="text" className="form-control" name="adresse" value={employe.adresse} onChange={handleChange} required />
                    </div> 
                     <div className="mb-3">
                        <label className="form-label">Ville</label>
                        <input type="text" className="form-control" name="ville" value={employe.ville} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Code</label>
                        <input type="text" className="form-control" name="password" value={employe.password} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Téléphone</label>
                        <input type="number" className="form-control" name="tel" value={employe.tel} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn w-100" style={{ backgroundColor: "rgb(74,138,126)", color: "white", fontWeight: "bold" }}>
                        Ajouter
                    </button>
                </form>
            </div>
        </div> 
    );
};

export default AddEmploye;
