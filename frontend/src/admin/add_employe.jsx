import React, { useState ,useEffect } from "react";
import axios from "axios"; // Ajout de l'importation d'axios
import { useNavigate } from "react-router-dom"; // Corriger l'importation de Link




const Add_employe = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!userId) {
      // Si userId est null ou vide, rediriger vers /signin
      navigate('/signin');
    }
  }, [userId, navigate]);
    const [employe,setemploye]=useState({
        nomcomplet:"",
        email:"",
        adresse:"",
        password:"",
        tel:"",
     });

      
    const handlechange = (e) => {
    const { name, value } = e.target;  
    setemploye((prevUser) => ({ 
      ...prevUser,  
      [name]: value,  
    }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
     
        try {
          // Envoie de la requête POST avec axios
          const response = await axios.post('http://localhost:8800/employe', employe);
          console.log('employe ajouté avec succès', response.data);
           
          window.location.href = '/admin/employe';  

        } catch (err) {
          console.error('Erreur lors de l\'ajout de employe', err);
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
    <div className='form'>
        <form onSubmit={handleSubmit}>
      <h1>Add new employe</h1>
      <input type="text" placeholder="enter name" onChange={handlechange}  name="nomcomplet" required/><br/>
      <input type="email" placeholder="enter email" onChange={handlechange} name="email" required/><br/>
      <input type="text" placeholder="enter adresse" onChange={handlechange} name="adresse" required/><br/>
      <input type="text" placeholder="enter code" onChange={handlechange} name="password" required/><br/>
      <input type="number" placeholder="enter tel" onChange={handlechange} name="tel" required/><br/>
      {/* <select name="type_user" onChange={handlechange} required>
      <option value="" >-- Sélectionnez un rôle --</option>
              <option value="livreur">livreur</option>
        <option value="gdepot">gestionnaire de depot</option>
      </select> */}

      <button type="submit" >add</button>
      </form>


      </div><br/><br/><br/><br/><br/><br/><br/><br/>
      </div>
  );
};

export default Add_employe;
