import express from "express" // Framework web pour créer des API facilement
import cors from "cors"//Middleware qui permet de gérer les permissions des requetes get , put , post .... (autoriser la methode ou non)
import dotenv from "dotenv";//Charge les variables d’environnement depuis un fichier .env

//Importation des Routes
import fournisseurRoutes from "./src/routes/FournisseurRoutes.js";
import employeRoutes from "./src/routes/EmployeRoutes.js";
import depotRoutes from "./src/routes/DepotRoutes.js";
import commandeClientRoutes from "./src/routes/CommandeClientRoutes.js";
import commandeFournisseurRoutes from "./src/routes/CommandeFournisseurRoutes.js";
import stockRoutes from "./src/routes/StockRoutes.js";
import categorieRoutes from "./src/routes/CategorieRoutes.js";
import productRoutes from "./src/routes/ProductRoutes.js";
import factureRoutes from "./src/routes/FactureRoutes.js";
import FournirRoutes from "./src/routes/FournirRoutes.js";
import db from "./src/config/database.js";
import clientRoutes from "./src/routes/ClientRoutes.js";              
import dashboardRoutes from "./src/routes/DashboardRoutes.js"; 
import userRoutes from "./src/routes/UserRoutes.js";              
import reclamationRoutes from './src/routes/ReclamationRoutes.js';


dotenv.config();//Chargement des variables d’environnement 
const app = express();//Création de l’application Express

app.use(express.json()); //  Permet de lire les données JSON envoyées par les clients.
app.use(cors()); // Active le partage de ressources entre origines différentes(front , back) (CORS).



// Déclaration des Routes
// 1.gestion des fournisseurs
app.use("/api", fournisseurRoutes);
// 2.gestion des employes
app.use("/api", employeRoutes);
// 3.gestion des depot
app.use("/api", depotRoutes);
// 4.gestion des commandes clients
app.use("/api", commandeClientRoutes);
// 5.gestion des commandes fournisseurs
app.use("/api", commandeFournisseurRoutes);
//6.gestion de stock
app.use("/api", stockRoutes);
//7.gestion des catégories
app.use("/api", categorieRoutes);
//8.gestion des produits
app.use("/api", productRoutes);
//9.gestion des factures fournisseurs
app.use("/api", factureRoutes);
//10. les produit d'un fournisseur specifique
app.use("/api", FournirRoutes);
//11. donnees de dashboard
app.use("/api/dashboard", dashboardRoutes);
// 12.gestion des client
app.use("/api", clientRoutes);
// 13.gestion d'authentification
app.use("/", userRoutes);
// 14.gestion des reclamation
app.use("/api", reclamationRoutes);

 





//Démarrage du Serveur
//listen to any request to 8800
app.listen(8800, () => {
  console.log("Connected to backend!");
});

