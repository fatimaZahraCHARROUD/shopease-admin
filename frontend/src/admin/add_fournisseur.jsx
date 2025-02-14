import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddFournisseur = () => {
    const userId = localStorage.getItem("adminId");
    const navigate = useNavigate();
    const [fournisseur, setFournisseur] = useState({
        nomcomplet: "",
        email: "",
        adresse: "",
        tel: ""
    });

    useEffect(() => {
        if (!userId) {
            navigate('/signin');
        }
    }, [userId, navigate]);

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
            await axios.post('http://localhost:8800/api/fournisseur', fournisseur);
            alert('Fournisseur ajouté avec succès !');
            navigate('/admin/fournisseur');
        } catch (err) {
            console.error('Erreur lors de l\'ajout du fournisseur', err);
            alert("Une erreur est survenue lors de l'ajout.");
        }
    };

    return (
        <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{
                width: "30%",
                padding: "40px",
                borderRadius: "8px",
                backgroundColor: "white",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
            }}>
                <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Ajouter un Fournisseur</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nom Complet</label>
                        <input type="text" className="form-control" name="nomcomplet" value={fournisseur.nomcomplet} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={fournisseur.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Adresse</label>
                        <input type="text" className="form-control" name="adresse" value={fournisseur.adresse} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Téléphone</label>
                        <input type="text" className="form-control" name="tel" value={fournisseur.tel} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn w-100" style={{ backgroundColor: "#289dd2", color: "white", fontWeight: "bold" }}>
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddFournisseur;
