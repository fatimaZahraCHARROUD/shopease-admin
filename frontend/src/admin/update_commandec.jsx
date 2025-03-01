import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; 
 
const update_commandec = () => {
  const userId = localStorage.getItem("adminId");  const navigate = useNavigate(); 

  useEffect(() => {
    if (!userId) {
      // Si userId est null ou vide, rediriger vers /signin
      navigate('/signin');
    }
  }, [userId, navigate]);
  const { id } = useParams(); 
 
  const [commandec, setcommandec] = useState({
    etat: "",
    id_livreur:"",
  });

   useEffect(() => { 
     const fetchcommandec = async () => { 
           try {
        const response = await axios.get(`http://localhost:8800/api/commandec/${id}`); 
        setcommandec(response.data || {}); 
       } catch (err) {
        console.error("Erreur lors de la récupération des données de commandec :", err);
      }
    };

    fetchcommandec();
  }, [id]); 
  
  const [livreur, setlivreur] = useState([]); // Liste des livreur

  // Récupération des livreur de dépôt
  useEffect(() => {
    const fetchlivreur = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/livreur");  
         setlivreur(response.data);
       } catch (err) {
        console.error("Erreur lors de la récupération des livreur :", err);
      }
    };

    fetchlivreur();
  }, []); 
   const handleChange = (e) => {
    const { name, value } = e.target;  
    setcommandec((prevcommandec) => ({ 
      ...prevcommandec,  
      [name]: value, 
    }));
  };
  

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/api/commandec/${id}`, commandec);
      alert("commandec affecté avec succès !");
      navigate("/admin/commandec");  
    } catch (err) {
      console.error("Erreur lors de la mise à jour de commandec :", err);
    }
  };

  if (!commandec || Object.keys(commandec).length === 0) {
    return <p>Chargement des données...</p>;
  }
  return (    <div style={{ backgroundColor: "#f8f9fa",}}>

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
                    Affecter la commande à un livreur
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Livreur</label>
                        <select
                            className="form-control"
                            name="id_livreur" 
                            value={commandec.id_livreur}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Sélectionnez un livreur --</option>
            {livreur.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nomcomplet} - {g.email}
              </option>
            ))}  </select>
                    </div>

                     
                    <button 
                        type="submit" 
                        className="btn w-100" 
                        style={{ backgroundColor: "rgb(74,138,126)", color: "white", fontWeight: "bold" }}
                    >
                        Affecter
                    </button>
                </form>
            </div>
        </div></div>
    );
 
};

export default update_commandec;
