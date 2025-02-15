import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCommandef = () => {
    const userId = localStorage.getItem("adminId");
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/signin');
        }
    }, [userId, navigate]);

    const { id } = useParams();
    const [commandef, setCommandef] = useState({
        etat: "",
        date_possible: ""
    });

    useEffect(() => {
        const fetchCommandef = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/commandef/${id}`);
                setCommandef(response.data[0]);
            } catch (err) {
                console.error("Erreur lors de la récupération des données de commandef :", err);
            }
        };
        fetchCommandef();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCommandef((prevCommandef) => ({
            ...prevCommandef,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (commandef.etat === "acceptée" && !commandef.date_possible) {
            alert("Veuillez spécifier une date de réception possible");
            return;
        }

        try {
            if (commandef.etat === "acceptée") {
                await axios.put(`http://localhost:8800/api/commandef/accept/${id}`, {
                    date_possible: commandef.date_possible
                });
            } else {
                await axios.put(`http://localhost:8800/api/commandef/recue/${id}`);
            }

            alert("Commande mise à jour avec succès !");
            navigate("/admin/commandef");
        } catch (err) {
            console.error("Erreur lors de la mise à jour de la commande :", err);
        }
    };

    return (
        <div style={{  marginLeft:"250px" ,
            backgroundColor: "#f8f9fa", 
            minHeight: "100vh", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center" 
        }}>
            <div style={{
                width: "700px",
                padding: "40px",
                borderRadius: "8px",
                backgroundColor: "white",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
            }}>
                <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
                    Mettre à jour la commande
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">État de la commande</label>
                        <select
                            className="form-control"
                            name="etat"
                            value={commandef.etat}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Sélectionnez l'état --</option>
                            <option value="acceptée">Acceptée</option>
                            <option value="reçue">Reçue</option>
                        </select>
                    </div>

                    {commandef.etat === "acceptée" && (
                        <div className="mb-3">
                            <label className="form-label">Date prévue de réception</label>
                            <input
                                type="date"
                                className="form-control"
                                name="date_possible"
                                value={commandef.date_possible}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="btn w-100" 
                        style={{ backgroundColor: "black", color: "white", fontWeight: "bold" }}
                    >
                        Mettre à jour
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateCommandef;
