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
        const response = await axios.get(`http://localhost:8800/commandec/${id}`); 
        setcommandec(response.data[0]); 
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
        const response = await axios.get("http://localhost:8800/livreur");  
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
      await axios.put(`http://localhost:8800/commandec/${id}`, commandec);
      alert("commandec affecté avec succès !");
      navigate("/admin/commandec");  
    } catch (err) {
      console.error("Erreur lors de la mise à jour de commandec :", err);
    }
  };

  return (<>
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
        .form input ,.form select  {
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
            background-color:rgb(175, 76, 127);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
        }
        .form button:hover {
            background-color:rgb(160, 69, 108);
        }
    `}
</style>
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1>Mettre à jour le commandec</h1>
     
      
          <select 
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
            ))}
          </select>

        <button type="submit">Mettre à jour</button>
      </form>
    </div></>
  );
};

export default update_commandec;
