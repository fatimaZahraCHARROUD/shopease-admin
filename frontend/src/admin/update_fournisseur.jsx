import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; 

const update_fournisseur = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!userId) {
      // Si userId est null ou vide, rediriger vers /signin
      navigate('/signin');
    }
  }, [userId, navigate]);

  
  const { id } = useParams(); 

  const [fournisseur, setfournisseur] = useState({
    nomcomplet: "",
    email: "",
    tel:"",
    adresse:"",
  });

   useEffect(() => { 
     const fetchfournisseur = async () => { 
           try {
        const response = await axios.get(`http://localhost:8800/fournisseur/${id}`); 
        setfournisseur(response.data[0]); 
       } catch (err) {
        console.error("Erreur lors de la récupération des données de fournisseur :", err);
      }
    };

    fetchfournisseur();
  }, [id]); 
  
   const handleChange = (e) => {
    const { name, value } = e.target;  
    setfournisseur((prevfournisseur) => ({ 
      ...prevfournisseur,  
      [name]: value, 
    }));
  };
  

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/fournisseur/${id}`, fournisseur);
      alert("fournisseur modifié avec succès !");
      navigate("/admin/fournisseur");  
    } catch (err) {
      console.error("Erreur lors de la mise à jour de fournisseur :", err);
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
        .form input {
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
        <h1>Mettre à jour le fournisseur</h1>
        <input type="text"  placeholder="Nom" name="nomcomplet" value={fournisseur.nomcomplet} onChange={handleChange} required />  
          <br />
        <input type="email" placeholder="email" name="email" value={fournisseur.email} onChange={handleChange} required />
        <br />
        <input type="text" placeholder="tel" name="tel" value={fournisseur.tel} onChange={handleChange} required />
        <br /> 
         <input type="text" placeholder="adresse" name="adresse" value={fournisseur.adresse} onChange={handleChange} required />
        <br />
        <button type="submit">Mettre à jour</button>
      </form>
    </div></>
  );
};

export default update_fournisseur;
