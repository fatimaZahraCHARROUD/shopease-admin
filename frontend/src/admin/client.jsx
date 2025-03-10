import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Client = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!userId) {
      navigate('/signin');
    }
  }, [userId, navigate]);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/client");
      setClients(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des clients :", err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

 

  const filteredClients = clients.filter((e) =>
    e.nomcomplet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
         <div style={{ marginLeft: "270px", padding: "20px", fontFamily: "Arial" }}>
            
         <div
     style={{
       display: "flex",
       justifyContent: "space-between", // Aligner à gauche et à droite
       alignItems: "center", // Centrer verticalement
       marginBottom: "10px",
       marginTop: "30px", // Ajuster l'espacement si nécessaire
     marginBottom:"30px",
     }}
   >
     {/* Champ de recherche */}
     <div className="input-group" style={{ width: "960px" }}>
       <span className="input-group-text" style={{ color:"white", backgroundColor: "rgb(74,138,126)"}}>
         <i className="fa fa-search"></i> {/* Icône FontAwesome */}
       </span>
       <input
         type="text"
         placeholder="Rechercher un client..."
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
         className="form-control py-2"
       />
     </div>
     </div>

        {/* Tableau des clients */}
        <table className="table shadow">
          <thead>
            <tr>
            <th style={{color:" rgb(74,138,126)", backgroundColor:"rgb(206,228,224)"}}>Nom</th>
            <th style={{color:" rgb(74,138,126)", backgroundColor:"rgb(206,228,224)"}}>Email</th>  
            <th style={{color:" rgb(74,138,126)", backgroundColor:"rgb(206,228,224)"}}>Adresse</th>
            <th style={{color:" rgb(74,138,126)", backgroundColor:"rgb(206,228,224)"}}>Téléphone</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredClients.length > 0 ? (
              filteredClients.map((e) => (
                <tr key={e.id}>
                  <td>{e.nomcomplet}</td>
                  <td>{e.email}</td>
                  <td>{e.adresse},{e.ville}</td>
                  <td>0{e.tel}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Aucun Cient trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Client;