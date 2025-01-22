import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; 

const update_depot = () => {
  const userId = localStorage.getItem("adminId");  const navigate = useNavigate(); 

  useEffect(() => {
    if (!userId) {
      // Si userId est null ou vide, rediriger vers /signin
      navigate('/signin');
    }
  }, [userId, navigate]);
  const { id } = useParams(); 
 
  const [depot, setdepot] = useState({
     adresse: "",
  });

   useEffect(() => { 
     const fetchdepot = async () => { 
           try {
        const response = await axios.get(`http://localhost:8800/depot/${id}`); 
        setdepot(response.data[0]); 
       } catch (err) {
        console.error("Erreur lors de la récupération des données de depot :", err);
      }
    };

    fetchdepot();
  }, [id]); 
  
  const [gestionnaires, setGestionnaires] = useState([]); // Liste des gestionnaires

  // Récupération des gestionnaires de dépôt
  useEffect(() => {
    const fetchGestionnaires = async () => {
      try {
        const response = await axios.get("http://localhost:8800/gdepot");  
         setGestionnaires(response.data);
       } catch (err) {
        console.error("Erreur lors de la récupération des gestionnaires de dépôt :", err);
      }
    };

    fetchGestionnaires();
  }, []); 
   const handleChange = (e) => {
    const { name, value } = e.target;  
    setdepot((prevdepot) => ({ 
      ...prevdepot,  
      [name]: value, 
    }));
  };
  

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/depot/${id}`, depot);
      alert("depot modifié avec succès !");
      navigate("/admin/depot");  
    } catch (err) {
      console.error("Erreur lors de la mise à jour de depot :", err);
    }
  };

  return (<>
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
        <h1>Mettre à jour le depot</h1>
        <input type="text"  placeholder="adresse" name="adresse" value={depot.adresse} onChange={handleChange} required />  
          <br />
      
          

        <button type="submit">Mettre à jour</button>
      </form>
    </div></>
  );
};

export default update_depot;
