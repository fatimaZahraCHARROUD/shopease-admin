import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; 

const update_employe = () => {
  const userId = localStorage.getItem("adminId");  const navigate = useNavigate(); 

  useEffect(() => {
    if (!userId) {
      // Si userId est null ou vide, rediriger vers /signin
      navigate('/signin');
    }
  }, [userId, navigate]);
  const { id } = useParams(); 
 
  const [employe, setemploye] = useState({
    nomcomplet:"",
    email:"",
    adresse:"",
    tel:"",
    password:"",
   });

   useEffect(() => { 
     const fetchemploye = async () => { 
           try {
        const response = await axios.get(`http://localhost:8800/employe/${id}`); 
        setemploye(response.data[0]); 
       } catch (err) {
        console.error("Erreur lors de la récupération des données de employe :", err);
      }
    };

    fetchemploye();
  }, [id]); 
  
   const handleChange = (e) => {
    const { name, value } = e.target;  
    setemploye((prevemploye) => ({ 
      ...prevemploye,  
      [name]: value, 
    }));
  };
  

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/employe/${id}`, employe);
      alert("employe modifié avec succès !");
      navigate("/admin/employe");  
    } catch (err) {
      console.error("Erreur lors de la mise à jour de employe :", err);
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
        <h1>Mettre à jour le employe</h1>
        <input type="text"  placeholder="Nom" name="nomcomplet" value={employe.nomcomplet} onChange={handleChange} required />  
          <br />
        <input type="email" placeholder="email" name="email" value={employe.email} onChange={handleChange} required />
        <br />
        <input type="text" placeholder="code" name="password" value={employe.password} onChange={handleChange} required />
        <br /> 
        <input type="text" placeholder="adresse" name="adresse" value={employe.adresse} onChange={handleChange} required />
        <br />   
        <input type="int" placeholder="tel" name="adresse" value={employe.tel} onChange={handleChange} required />
        <br />
        
        <button type="submit">Mettre à jour</button>
      </form>
    </div></>
  );
};

export default update_employe;
