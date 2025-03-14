import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import { FaBriefcase, FaHome, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';


 import Client from "../admin/client";
 import Dashboard from "../admin/dashboard";
 import Reclamation from "../admin/reclamation";

import Fournisseur from "../admin/fournisseur";
import Add_fournisseur from "../admin/add_fournisseur";
import Update_fournisseur from "../admin/update_fournisseur";

import Commandec from "../admin/commandec";
import Update_commandec from "../admin/update_commandec";
import Details_cc from "../admin/details_cc";

import Employe from "../admin/employe";
import Add_employe from "../admin/add_employe";
import Update_employe from "../admin/update_employe";

import Depot from "../admin/depot";
 
import Produit_cc from "../admin/details_cc";

import Categorie from "../admin/categorie";
import Add_categorie from "../admin/add_categorie";
import Update_categorie from "../admin/update_categorie";
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
 

  return (
    <div >
      <style>
        {`
          /* Styles de base de la navigation */
          nav {
            border-radius: 30px;
            margin: 10px;
            background-color: white;
            color: rgb(206, 169, 134);
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            height: calc(99vh - 20px);
            position: fixed;
            top: 0;
            overflow-y: auto;
            left: 0;
            bottom: 20px;
            width: 260px;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            transition: transform 0.3s ease;
          }
          
          /* Styles responsive pour la navigation */
          @media (max-width: 768px) {
            nav {
              transform: translateX(-280px); /* Masque la sidebar en dehors de l'écran */
              width: 260px;
            }
            
            nav.show {
              transform: translateX(0); /* Affiche la sidebar quand la classe show est active */
            }
            
            .content-area {
              margin-left: 0 !important;
              padding: 10px !important;
            }
          }
          
          nav ul {
            list-style-type: none;
            margin: 0;
            margin-top: 20px;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
          }
          
          nav ul li {
            display: block;
            width: 100%;
          }
          
          nav ul li a, .dropdown-btn {
            color: rgb(117, 118, 118);
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
            border-radius: 5px;
            background-color: rgba(225, 223, 223, 0.22);
          }
          
          .dropdown {
            list-style-type: none;
            padding-left: 15px;
            margin: 0;
            max-height: 300px;
          }
          
          .dropdown li a {
            font-weight: normal;
            padding: 8px 10px;
          }
          
          /* Bouton menu hamburger */
          .menu-toggle {
            display: none;
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 1001; 
             color: rgb(74,138,126);
            border: none;
            border-radius: 5px;
            padding: 10px;
            cursor: pointer;
            font-size: 18px;
          }
          
          @media (max-width: 768px) {
            .menu-toggle {
              display: block;
            }
          }
          
          /* Overlay pour fermer le menu sur mobile */
          .sidebar-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
          }
          
          @media (max-width: 768px) {
            .sidebar-overlay.show {
              display: block;
            }
          }
        
        `}
      </style>
     
    
          {/* Bouton menu hamburger pour mobile */}
          <button  
            className="menu-toggle" 
            onClick={() => {
              const navElement = document.querySelector('nav');
              const overlay = document.querySelector('.sidebar-overlay');
              navElement.classList.toggle('show');
              overlay.classList.toggle('show');
            }}
          >
            <i className="fa fa-bars"></i>
          </button>
          
          {/* Overlay pour fermer le menu sur mobile */}
          <div 
            className="sidebar-overlay" 
            onClick={() => {
              const navElement = document.querySelector('nav');
              const overlay = document.querySelector('.sidebar-overlay');
              navElement.classList.remove('show');
              overlay.classList.remove('show');
            }}
          ></div>
          
          <nav><br/><br/>
            <h1 style={{ marginTop:"10px", fontWeight:"bold", color:"rgb(74,138,126)" }}>ShopEase</h1>
            <ul>        
              <li>
                <Link to="/admin/dashboard" title="Dashboard">
                  <i className="fa-solid fa-chart-pie" style={{ marginRight: "8px" }}></i> Dashboard
                </Link>
              </li>
      
              <li>
                <button className="dropdown-btn" onClick={() => setShowPatrimoine(!showPatrimoine)}>
                  <FaBriefcase style={{ marginRight: "10px" }} />
                  Gestion
                  {showPatrimoine ? 
                    <FaChevronUp style={{ marginLeft: "auto" }} /> : 
                    <FaChevronDown style={{ marginLeft: "auto" }} />
                  }
                </button>
                {showPatrimoine && (
                  <ul className="dropdown">
                    <li><Link to="/admin/fournisseur"><i className="fa fa-truck" style={{ marginRight: "10px" }}></i>Fournisseur</Link></li>
                    <li><Link to="/admin/client"><i className="fa fa-users" style={{ marginRight: "10px" }}></i>Client</Link></li>
                    <li><Link to="/admin/employe"><i className="fa fa-motorcycle" style={{ marginRight: "10px" }}></i>Livreur</Link></li>
                    <li><Link to="/admin/categorie"><i className="fa fa-tags" style={{ marginRight: "10px" }}></i>Catégorie</Link></li>
                    <li><Link to="/admin/produit"><i className="fa fa-cube" style={{ marginRight: "10px" }}></i>Produit</Link></li>
                    <li><Link to="/admin/depot"><i className="fa fa-warehouse" style={{ marginRight: "10px" }}></i>Dépot</Link></li>
                  </ul>
                )}
              </li>
      
              <li>
                <button className="dropdown-btn" onClick={() => setShowStore(!showStore)}>
                  <i className="fa-solid fa-store" style={{ marginRight: "10px" }}></i>
                  Store
                  {showStore ? 
                    <FaChevronUp style={{ marginLeft: "auto" }} /> : 
                    <FaChevronDown style={{ marginLeft: "auto" }} />
                  }
                </button>
                {showStore && (
                  <ul className="dropdown">
                    <li><Link to="/admin/commandef"><i className="fa fa-cart-plus" style={{ marginRight: "10px" }}></i>Commande Fournisseur</Link></li>
                    <li><Link to="/admin/commandec"><i className="fa fa-shopping-cart" style={{ marginRight: "10px" }}></i>Commande Client</Link></li>
                    <li><Link to="/admin/stock"><i className="fa fa-archive" style={{ marginRight: "10px" }}></i>Stock</Link></li>
                  </ul>
                )}
              </li>
              
              <li><Link to="/admin/facture"><i className="fa fa-file-invoice" style={{ marginRight: "10px" }}></i> Facture</Link></li>
              <hr/>
      
              <li><Link to="/admin/reclamation"><i className="fas fa-comment-dots" style={{ marginRight: "10px" }}></i> Reclamation</Link></li>
              <li><Link to="/home"><i className="fas fa-sign-out-alt" style={{ marginRight: "8px" }}></i>Log out</Link></li>
            </ul>
          </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reclamation" element={<Reclamation />} />
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
        <Route path="update_categorie/:id" element={<Update_categorie />} />

        <Route path="facture" element={<Facture />} />
        <Route path="add_facture" element={<Add_facture />} />
        <Route path="update_facture/:id" element={<Update_facture />} />
        <Route path="details_facture/:id" element={<Details_facture />} />
        <Route path="details_cc/:id" element={<Details_cc />} />
      </Routes>
    </div >
  );
};

export default Admin;
