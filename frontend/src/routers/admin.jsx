import { Routes, Route, Link } from "react-router-dom";
import React from "react";

import Fournisseur from "../admin/fournisseur";  
import Add_fournisseur from "../admin/add_fournisseur";  
import Update_fournisseur from "../admin/update_fournisseur";

import Commandec from "../admin/commandec"; 
import Update_commandec from "../admin/update_commandec";

import Employe from "../admin/employe";  
import Add_employe from "../admin/add_employe";  
import Update_employe from "../admin/update_employe";

import Depot from "../admin/depot";  
import Add_depot from "../admin/add_depot";  
import Update_depot from "../admin/update_depot";

import Produit_cc from "../admin/details_cc";

 import Categorie from "../admin/categorie";  
 import Details_categorie from "../admin/details_categorie";  

 import Facture from "../admin/facture"; 
 import Add_facture from "../admin/add_facture";  
 import Update_facture from "../admin/update_facture";  
 import Details_facture  from "../admin/details_facture";  

 
 import Produit from "../admin/produit";  
 import Add_produit from "../admin/add_produit";  
 import Update_produit from "../admin/update_produit";  

 
import Commandef from "../admin/commandef";  
import Add_commandef from "../admin/add_commandef";  
import Update_commandef from "../admin/update_commandef"; 

import Stock from "../admin/stock";  
import Produit_cf from "../admin/produit_cf";  
 


const Admin = () => {
  return (
    <div>
     <style>
        {`
          nav {
            background-color: rgb(175, 76, 101);
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            width: 200px;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
          }
          nav ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          nav ul li {
            display: block;
          }
          nav ul li a {
            color: white;
            text-decoration: none;
            font-weight: bold;
            padding: 10px;
            display: block;
          }
          nav ul li a:hover {
            text-decoration: underline;
            background-color: rgb(130, 52, 70);
          }
          body {
            margin-left: 30px; /* Ajoute un margin-left de 30px */
          }
          .content {
            margin-left: 230px; /* Ajoute un margin-left pour ne pas chevaucher la navbar */
            padding: 10px;
          }
        `}
      </style>
      <nav>
        <ul>
          <li><Link to="/admin/fournisseur">Fournisseur</Link></li>
          <li><Link to="/admin/employe">Employé</Link></li>
          <li><Link to="/admin/depot">Dépot</Link></li>
          <li><Link to="/admin/commandec">Commande Client</Link></li>
          <li><Link to="/admin/categorie">Categorie</Link></li>
          <li><Link to="/admin/commandef">Commande Fournisseur</Link></li>
          <li><Link to="/admin/stock">Stock</Link></li>
          <li><Link to="/admin/produit">produit</Link></li>
          <li><Link to="/admin/facture">facture</Link></li>
          <li><Link to="/home">Log out</Link></li>
          
        </ul>
      </nav>
      <hr style={{ marginLeft: "30px", borderColor: "rgb(175, 76, 101)", borderWidth: "4px" }} />

      <Routes>
        <Route path="/" element={<Stock />} />
        <Route path="fournisseur" element={<Fournisseur />} />
        <Route path="add_fournisseur" element={<Add_fournisseur />} />
        <Route path="update_fournisseur/:id" element={<Update_fournisseur />} />
        <Route path="commandec" element={<Commandec />} />
        <Route path="update_commandec/:id" element={<Update_commandec />} />
        <Route path="employe" element={<Employe />} />
        <Route path="add_employe" element={<Add_employe />} />
        <Route path="update_employe/:id" element={<Update_employe />} />
        <Route path="depot" element={<Depot />} />
        <Route path="add_depot" element={<Add_depot />} />
        <Route path="update_depot/:id" element={<Update_depot />} />
        <Route path="produit_cc/:id" element={<Produit_cc />} />
        <Route path="categorie" element={<Categorie />} />
        <Route path="details_categorie/:id" element={<Details_categorie />} />
        <Route path="commandef" element={<Commandef />} /> 
        <Route path="stock" element={<Stock />} />
         <Route path="produit_cf/:id" element={<Produit_cf />} />
        <Route path="add_commandef" element={<Add_commandef />} />
        <Route path="update_commandef/:id" element={<Update_commandef />} />
        <Route path="produit" element={<Produit />} />
        <Route path="add_produit" element={<Add_produit />} />
        <Route path="update_produit/:id" element={<Update_produit />} />

        <Route path="facture" element={<Facture />} />
        <Route path="add_facture" element={<Add_facture />} />
        <Route path="update_facture/:id" element={<Update_facture />} />
        <Route path="details_facture/:id" element={<Details_facture />} />

 

      </Routes>
    </div>
  );
};

export default Admin;
