import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCommandef = () => {
    const userId = localStorage.getItem("adminId");
 const navigate = useNavigate(); 

  useEffect(() => {
    if (!userId) {
      // Si userId est null ou vide, rediriger vers /signin
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
        const response = await axios.get(`http://localhost:8800/commandef/${id}`);
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
        // Utiliser l'API pour mettre à jour l'état et la date
        await axios.put(`http://localhost:8800/commandef/accept/${id}`, {
           
          date_possible: commandef.date_possible
        });
      } else {
        // Utiliser l'API standard pour mettre à jour uniquement l'état
        await axios.put(`http://localhost:8800/commandef/recue/${id}`);
      }
      
      alert("Commandef modifié avec succès !");
      navigate("/admin/commandef");
    } catch (err) {
      console.error("Erreur lors de la mise à jour de commandef :", err);
    }
  };

  return (
    <div>
      <style>
        {`
          .form {
            width: 300px;
            margin: 50px auto;marginLeft:"180px";
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
          .form .date-field {
            margin-top: 15px;
          }
        `}
      </style>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <h1>Mettre à jour le commandef</h1>

          <select
            name="etat"
            value={commandef.etat}
            onChange={handleChange}
            required
          >
            <option value="">-- Modifier l'état de la commande f --</option>
            <option value="acceptée">Acceptée</option>
            <option value="reçue">Reçue</option>
          </select>

          {commandef.etat === "acceptée" && (
            <div className="date-field">
              <label>Date possible de réception :</label>
              <input
                type="date"
                name="date_possible"
                value={commandef.date_possible}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit">Mettre à jour</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCommandef;