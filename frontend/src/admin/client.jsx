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
      
      
      
    <div 
      className="content-area"
      style={{ 
        padding: "20px", 
        fontFamily: "Arial",
        marginLeft: "270px",
        transition: "margin-left 0.3s ease"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "30px",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "10px"
        }}
      ><br/>
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

     <div style={{ 
      overflowX: "auto", 
      maxWidth: "100%", 
      boxShadow: "0 0 10px rgba(0,0,0,0.1)" 
    }}>
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
    </div></div>
  );
};

export default Client;