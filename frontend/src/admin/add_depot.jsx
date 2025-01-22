import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Corriger l'importation de Link
 
const Add_depot = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!userId) {
      // Si userId est null ou vide, rediriger vers /signin
      navigate('/signin');
    }
  }, [userId, navigate]);
  const [depot, setDepot] = useState({
    id_user: "",
    adresse: "",
  });

  const [gestionnaires, setGestionnaires] = useState([]); // Liste des gestionnaires

  // Récupération des gestionnaires de dépôt
  // useEffect(() => {
  //   const fetchGestionnaires = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8800/gdepot");  
  //        setGestionnaires(response.data);
  //      } catch (err) {
  //       console.error("Erreur lors de la récupération des gestionnaires de dépôt :", err);
  //     }
  //   };

  //   fetchGestionnaires();
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepot((prevDepot) => ({
      ...prevDepot,
      [name]: value,
    }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault(); 
 
    try {
      // Envoie de la requête POST avec axios
      const response = await axios.post('http://localhost:8800/depot', depot);
      console.log('depot ajouté avec succès', response.data);
       
      window.location.href = '/admin/depot';  

    } catch (err) {
      console.error('Erreur lors de l\'ajout de depot', err);
    }
  };
  return (
    <div>
      <style>
        {`
            .form {
                width: 300px;
                margin: 50px auto;
                marginLeft:"180px";
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                font-family: Arial, sans-serif;
            }
            .form h1 {
                text-align: center;
                color: #333;
                margin-bottom: 20px;
            }
            .form input, .form select {
                width: 100%;
                padding: 10px;
                margin: 10px 0;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-sizing: border-box;
            }
            .form button {
                width: 100%;
                padding: 10px;
                background-color: rgb(175, 76, 127);
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
            }
            .form button:hover {
                background-color: rgb(160, 69, 108);
            }
        `}
      </style>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <h1>Ajouter un nouveau dépôt</h1>
          <input 
            type="text" 
            placeholder="Entrez l'adresse" 
            onChange={handleChange} 
            name="adresse" 
            required 
          />
          <br />
          {/* <select 
            name="id_user" 
            value={depot.id_user} 
            onChange={handleChange} 
            required
          >
            <option value="">-- Sélectionnez un gestionnaire de dépôt --</option>
            {gestionnaires.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nomcomplet} - {g.email}
              </option>
            ))}
          </select> */}
          <br />
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  );
};

export default Add_depot;
