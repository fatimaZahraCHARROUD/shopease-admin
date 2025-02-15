import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import { FaBriefcase, FaHome, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";


import Accueil from "../admin/accueil";
import Client from "../admin/client";
import Dashboard from "../admin/dashboard";

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
import Add_categorie from "../admin/add_categorie";
// import Update_categorie from "../admin/update_categorie";
import Details_categorie from "../admin/details_categorie";

import Facture from "../admin/facture";
import Add_facture from "../admin/add_facture";
import Update_facture from "../admin/update_facture";
import Details_facture from "../admin/details_facture";


import Produit from "../admin/produit";
import Add_produit from "../admin/add_produit";
import Update_produit from "../admin/update_produit";


import Commandef from "../admin/commandef";
import Add_commandef from "../admin/add_commandef";
import Update_commandef from "../admin/update_commandef";

import Stock from "../admin/stock";
import Produit_cf from "../admin/produit_cf";




const Admin = () => {
  const [showPatrimoine, setShowPatrimoine] = useState(false);
  const [showStore, setShowStore] = useState(false);
  const [showFinance, setShowFinance] = useState(false);


  return (
    <div>
      <style>
        {`
          nav {
            background-color:rgba(255, 255, 255, 0.93);
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            width: 260px;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
          }
          nav ul {
            list-style-type: none;
            margin: 0;
            margin-top: 80px;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          nav ul li {
            display: block;
          }
          nav ul li a, .dropdown-btn {
            color: gray;
            text-decoration: none;
            font-weight: bold;
            padding: 10px;
            display: block;
            cursor: pointer;
            background: none;
            border: none;
            text-align: left;
            width: 100%;
          }
          nav ul li a:hover, .dropdown-btn:hover {
            border-radius:5px;
            background-color: rgba(225, 223, 223, 0.22);
          }
          .dropdown {
            list-style-type: none;
            padding-left: 15px;
            margin: 0;
          }
          .dropdown li a {
            font-weight: normal;
            padding: 8px 10px;
          }
        `}
      </style>
      <nav>
        <ul>
          <li><Link to="/admin/Accueil"> <FaHome style={{ marginRight: "10px" }} /> Accueil</Link></li>
          <li>
            <button className="dropdown-btn" onClick={() => setShowPatrimoine(!showPatrimoine)}>
              <FaBriefcase style={{ marginRight: "10px"   }} />
              Gestion
              {showPatrimoine ? <FaChevronUp style={{ marginLeft: "115px" }} /> : <FaChevronDown style={{ marginLeft: "115px" }} />}
            </button>
            {showPatrimoine && (
              <ul className="dropdown">
                <li><Link to="/admin/fournisseur">Fournisseur</Link></li>
                <li><Link to="/admin/client">Client</Link></li>
                <li><Link to="/admin/employe">Employé</Link></li>
                <li><Link to="/admin/categorie">Catégorie</Link></li>
                <li><Link to="/admin/produit">Produit</Link></li>
                <li><Link to="/admin/depot">Dépot</Link></li>
              </ul>
            )}
          </li>

          <li>
            <button className="dropdown-btn" onClick={() => setShowStore(!showStore)}>
              <i className="fa-solid fa-store" style={{ marginRight: "10px" }}></i>
              Store
              {showStore ? <FaChevronUp style={{ marginLeft: "129px" }} /> : <FaChevronDown style={{ marginLeft: "129px" }} />}
            </button>
            {showStore && (
              <ul className="dropdown">
                <li><Link to="/admin/commandef">Commande Fournisseur</Link></li>
                <li><Link to="/admin/commandec">Commande Client</Link></li>
                <li><Link to="/admin/stock">Stock</Link></li>
              </ul>
            )}
          </li>
          
          <li><Link to="/admin/facture"> <i className="fa-solid fa-coins" style={{ marginRight: "10px" }}> </i> Facture</Link></li>

          <li><Link to="/admin/dashboard"> <i className="fa-solid fa-chart-pie" style={{ marginRight: "8px" }}></i> Dashboard</Link></li>
          <li><Link to="/home"> <i class="fas fa-sign-out-alt" style={{ marginRight: "8px" }}></i>Log out</Link></li>
        </ul>
      </nav >

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Client" element={<Client />} />
        <Route path="/Stock" element={<Stock />} />
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
        <Route path="add_categorie" element={<Add_categorie />} />
        {/* <Route path="update_categorie/:id" element={<Update_categorie />} /> */}

        <Route path="facture" element={<Facture />} />
        <Route path="add_facture" element={<Add_facture />} />
        <Route path="update_facture/:id" element={<Update_facture />} />
        <Route path="details_facture/:id" element={<Details_facture />} />
      </Routes>
    </div >
  );
};

export default Admin;
