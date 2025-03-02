import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateEmploye = () => {
    const userId = localStorage.getItem("adminId");
    const navigate = useNavigate();
    const { id } = useParams();

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

    useEffect(() => {
        const fetchEmploye = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/employe/${id}`);
                setEmploye(response.data || {});
            } catch (err) {
                console.error("Erreur lors de la récupération des données de l'employé :", err);
            }
        };
        fetchEmploye();
    }, [id]);

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
            await axios.put(`http://localhost:8800/api/employe/${id}`, employe);
            alert("Employé mis à jour avec succès !");
            navigate("/admin/employe");
        } catch (err) {
            console.error("Erreur lors de la mise à jour de l'employé :", err);
        }
    };

    if (!employe || Object.keys(employe).length === 0) {
        return <p className="text-center mt-5">Chargement des données...</p>;
    }

    return (    <div style={{ backgroundColor: "#f8f9fa",}}>

        <div style={{marginLeft:"250px" , backgroundColor: "#f8f9fa", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{
                width: "700px",
                padding: "40px",
                borderRadius: "8px",
                backgroundColor: "white",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
            }}>
                <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Mettre à jour un Employé</h2>
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
                        Mettre à jour
                    </button>
                </form>
            </div>
        </div></div>
    );
};

export default UpdateEmploye;
