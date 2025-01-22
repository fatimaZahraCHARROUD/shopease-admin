import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express();

// Middleware pour lire les requêtes JSON
app.use(express.json());
//bax ydozo request mn react to node.js
app.use(cors());

const db = mysql.createConnection({// connect to database
    host: "localhost",
    user: "root",
    password: "",
    database: "pfe"
});




//1.fournisseur
//get method to select
 app.get("/fournisseur", (req, res) => {
    const q = "SELECT * FROM fournisseur";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
//get fournisseur specific
app.get("/fournisseur/:id", (req, res) => {
    const q = "SELECT * FROM fournisseur where id= ?";
    const userId = req.params.id; 
    db.query(q, [userId],(err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json({ message: "fournisseur introuvable" });
        return res.json(data);
    });
});

//post method to insert
app.post("/fournisseur", (req, res) => {
    const q = "INSERT INTO fournisseur (`nomcomplet`, `email`, `tel` , `adresse`) VALUES (?)";
    const values = [
        req.body.nomcomplet,
        req.body.email,
        req.body.tel,
        req.body.adresse
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("fournisseur has been added successfully!");
    });
});
//put method to update
app.put("/fournisseur/:id", (req, res) => {
    const fournisseurId = req.params.id; // Récupérer l'id depuis les paramètres
    const { nomcomplet, email, tel, adresse } = req.body; // objet passer avec name & password
    const q = "UPDATE fournisseur SET nomcomplet = ?, email = ?, tel = ?, adresse = ? WHERE id = ?";
    
    db.query(q, [ nomcomplet, email, tel, adresse, fournisseurId], (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows === 0) return res.status(404).json({ message: "fournisseur introuvable" });
        return res.json("fournisseur has been updated successfully!");
    });
});
//delete methoe to delete
app.delete("/fournisseur/:id", (req, res) => {
    const fournisseurId = req.params.id; // Récupérer l'id depuis les paramètres de url 
    const q = "DELETE FROM fournisseur WHERE id = ?";
    
    db.query(q, [fournisseurId], (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows === 0) return res.status(404).json({ message: "fournisseur introuvable" });
        return res.json("fournisseur has been deleted successfully!");
    });
});




//2.employe
//get user to select
app.get("/employe", (req, res) => {
    const q = "SELECT * FROM utilisateur WHERE type_user ='livreur'";
        db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
//get user specific
app.get("/employe/:id", (req, res) => {
    const q = "SELECT * FROM utilisateur where id= ?";
    const employeId = req.params.id; 
    db.query(q, [employeId],(err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json({ message: "employe introuvable" });
        return res.json(data);
    });
});
//post method to insert
app.post("/employe", (req, res) => {
    const q = "INSERT INTO utilisateur (`nomcomplet`, `email`, `password` , `adresse`, `type_user`,`tel`) VALUES (?)";
    const values = [
        req.body.nomcomplet,
        req.body.email,
        req.body.password,
        req.body.adresse,
        'livreur',
        req.body.tel,

    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("utilisateur has been added successfully!");
    });
});
//put method to update
app.put("/employe/:id", (req, res) => {
    const employeId = req.params.id; // Récupérer l'id depuis les paramètres
    const { nomcomplet, email, adresse,password,tel } = req.body; // objet passer avec name & password
    const q = "UPDATE utilisateur SET nomcomplet = ?, email = ?, password = ?, adresse = ? , tel= ? WHERE id = ?";
    
    db.query(q, [ nomcomplet, email, password, adresse,tel, employeId], (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows === 0) return res.status(404).json({ message: "utilisateur introuvable" });
        return res.json("utilisateur has been updated successfully!");
    });
});
//delete methoe to delete
app.delete("/employe/:id", (req, res) => {
    const employeId = req.params.id; // Récupérer l'id depuis les paramètres de url 
    const q = "DELETE FROM utilisateur WHERE id = ?";
    
    db.query(q, [employeId], (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows === 0) return res.status(404).json({ message: "utilisateur introuvable" });
        return res.json("utilisateur has been deleted successfully!");
    });
});




//3.depot
//get method to select
app.get("/depot", (req, res) => {
    const q = "SELECT id, adresse FROM depot   ";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
//get depot specific
app.get("/depot/:id", (req, res) => {
    const q = "SELECT * FROM depot where id= ?";
    const depotId = req.params.id; 
    db.query(q, [depotId],(err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json({ message: "depot introuvable" });
        return res.json(data);
    });
});
// //get all gestionnaire de depot
// app.get("/gdepot", (req, res) => {
//     const user_type="gdepot";
//     const q = "SELECT * FROM utilisateur where type_user= ?";
//     db.query(q,user_type, (err, data) => {
//         if (err) return res.json(err);
//         return res.json(data);
//     });
// });
//post method to insert
app.post("/depot", (req, res) => {
    const q = "INSERT INTO depot (`adresse`) VALUES (?)";
    const values = [
        req.body.adresse,
        
     
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("depot has been added successfully!");
    });
});
//put method to update
app.put("/depot/:id", (req, res) => {
    const depotId = req.params.id; // Récupérer l'id depuis les paramètres
    const { adresse} = req.body; // objet passer avec name & password
    const q = "UPDATE depot SET adresse = ? WHERE id = ?";
    
    db.query(q, [ adresse, depotId], (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows === 0) return res.status(404).json({ message: "depot introuvable" });
        return res.json("depot has been updated successfully!");
    });
});
//delete method to delete
app.delete("/depot/:id", (req, res) => {
    const depotId = req.params.id; // Récupérer l'id depuis les paramètres de url 
    const q = "DELETE FROM depot WHERE id = ?";
    
    db.query(q, [depotId], (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows === 0) return res.status(404).json({ message: "depot introuvable" });
        return res.json("depot has been deleted successfully!");
    });
});



//4.commande client
//get method to select
app.get("/commandec", (req, res) => {
    const q = `
        SELECT 
            commandec.id, 
            commandec.date,
            commandec.etat, 
            utilisateur.nomcomplet, 
            utilisateur.email 
        FROM 
            commandec 
        LEFT JOIN utilisateur 
            ON commandec.id_livreur = utilisateur.id 
        WHERE 
            (utilisateur.type_user = 'livreur' OR commandec.id_livreur IS NULL)
    `;

    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
//get commandec specific
app.get("/commandec/:id", (req, res) => {
    const q = "SELECT * FROM commandec where id= ?";
    const commandecId = req.params.id; 
    db.query(q, [commandecId],(err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json({ message: "commande client introuvable" });
        return res.json(data);
    });
});
//get product of commandef
app.get("/produit_cc/:id", (req, res) => {
    const commandecId = req.params.id;

    // Vérifier si la commande client existe d'abord
    const checkCommandeExist = "SELECT * FROM commandec WHERE id = ?";
    
    db.query(checkCommandeExist, [commandecId], (err, commandecData) => {
        if (err) return res.status(500).json({ message: "Erreur de serveur", error: err });
        if (commandecData.length === 0) {
            // Si la commande client n'existe pas
            return res.status(404).json({ message: "Commande client introuvable" });
        }

        // Si la commande client existe, récupérer les produits associés à partir de la table 'produit'
        const q = `
        SELECT 
            p.*, 
            pc.quantite AS quantite_commande, 
            c.nom AS categorie, 
            d.adresse AS depot, 
            d.adresse AS depot_adresse
        FROM produit p
        JOIN produit_cc pc ON p.id = pc.id_produit
        LEFT JOIN categorie c ON p.id_categorie = c.id
        LEFT JOIN depot d ON p.id_depot = d.id
        WHERE pc.id_cc = ?
    `;
    
        
        db.query(q, [commandecId], (err, data) => {
            if (err) return res.status(500).json({ message: "Erreur de serveur", error: err });
            if (data.length === 0) {
                return res.status(404).json({ message: "Aucun produit trouvé pour cette commande" });
            }
            return res.json(data); // Retourner les produits associés à la commande
        });
    });
});
//get all livreur
app.get("/livreur", (req, res) => {
    const user_type="livreur";
    const q = "SELECT * FROM utilisateur where type_user= ?";
    db.query(q,user_type, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
//post method to insert
app.post("/commandec", (req, res) => {
    const q = "INSERT INTO commandec (`date`, `etat`, `id_livreur` ) VALUES (?)";
    const values = [
        req.body.date,
        req.body.etat,
        req.body.id_livreur,
      
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("commandec has been added successfully!");
    });
});
//put method to update
app.put("/commandec/:id", (req, res) => {
    const { id } = req.params;
    const { id_livreur } = req.body;  // Récupère les données du corps de la requête
    const  etat="affecté";
    if (!id_livreur || !etat) {
      return res.status(400).json({ error: "Le livreur et l'état sont requis." });
    }
  
    const query = `
      UPDATE commandec
      SET id_livreur = ?, etat = ?
      WHERE id = ?`;
  
    db.query(query, [id_livreur, etat, id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Commande non trouvée" });
      }
  
      res.json({ message: "Commande mise à jour avec succès" });
    });
  });
//delete methoe to delete
app.delete("/commandec/:id", (req, res) => {
    const commandecId = req.params.id; // Récupérer l'id depuis les paramètres de url 
    const q = "DELETE FROM commandec WHERE id = ?";
    
    db.query(q, [commandecId], (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows === 0) return res.status(404).json({ message: "commande client introuvable" });
        return res.json("commande client has been deleted successfully!");
    });
});


 


//5.authentification
app.use(express.json()); // Middleware pour analyser les JSON
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
  
    const admin = "admin";
   
    // Vérification de l'utilisateur dans la base de données
    const query = `
      SELECT id, email, password, type_user 
      FROM utilisateur
      WHERE email = ? AND password = ? AND type_user = ?  
    `;
  
    db.query(query, [email, password, admin], (err, results) => {
      if (err) {
        console.error('Erreur SQL:', err);
        return res.status(500).json({ success: false, message: 'Erreur serveur !!.' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
      }
  
      const user = results[0];
  
      // Redirection en fonction du type d'utilisateur
      if (user.type_user === 'admin') {
        res.status(200).json({ success: true, message: 'Bienvenue, Admin!', redirectUrl: '/admin', idadmin: user.id  });
      }   else {
        res.status(403).json({ success: false, message: 'Accès non autorisé.' });
      }
    });
  });
  


//6.commande fournisseur
// GET method to select all commandes
app.get("/commandef", (req, res) => {
     const q = `
        SELECT 
            commandef.id, 
            commandef.date,commandef.date_possible,commandef.date_reçue,
            commandef.etat, 
            fournisseur.nomcomplet, 
            fournisseur.email 
        FROM 
            commandef
        LEFT JOIN fournisseur 
            ON commandef.id_fournisseur = fournisseur.id   
         `;

    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
//select product of commandef
app.get("/produit_cf/:id", (req, res) => {
    const commandefId = req.params.id;

    // Vérifier si la commande client existe d'abord
    const checkCommandeExist = "SELECT * FROM commandef WHERE id = ?";
    
    db.query(checkCommandeExist, [commandefId], (err, commandefData) => {
        if (err) return res.status(500).json({ message: "Erreur de serveur", error: err });
        if (commandefData.length === 0) {
            // Si la commande fournisseur n'existe pas
            return res.status(404).json({ message: "Commande fournisseur introuvable" });
        }

        // Si la commande fournisseur existe, récupérer les produits associés à partir de la table 'produit'
        const q = `
        SELECT 
            p.*, 
            pc.quantite AS quantite_commande, 
            c.nom AS categorie, 
            d.adresse AS depot, 
            d.adresse AS depot_adresse
        FROM produit p
        JOIN produit_cf pc ON p.id = pc.id_produit
        LEFT JOIN categorie c ON p.id_categorie = c.id
        LEFT JOIN depot d ON p.id_depot = d.id
        WHERE pc.id_cf = ?
    `;
    
        
        db.query(q, [commandefId], (err, data) => {
            if (err) return res.status(500).json({ message: "Erreur de serveur", error: err });
            if (data.length === 0) {
                return res.status(404).json({ message: "Aucun produit trouvé pour cette commande" });
            }
            return res.json(data); // Retourner les produits associés à la commande
        });
    });
});
// GET specific commandef
app.get("/commandef/:id", (req, res) => {
    const commandefId = req.params.id;

    // Query to get the command details
    const q = "SELECT * FROM commandef WHERE id = ?";
    
    
    db.query(q,commandefId, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);s
    });
    });
 
//get product of fournisseur
app.get("/fournir/:fournisseurId", (req, res) => {
    const fournisseurId = req.params.fournisseurId;
     const q = `
      SELECT 
        f.id_produit, 
        p.*, 
        c.nom AS categorie, 
        d.adresse AS depot
      FROM 
        fournir f
      JOIN 
        produit p ON p.id = f.id_produit  
      LEFT JOIN 
        categorie c ON p.id_categorie = c.id
      LEFT JOIN 
        depot d ON p.id_depot = d.id
       
      WHERE 
        f.id_fournisseur = ? 
         
       
    `;
    
    db.query(q, [fournisseurId], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
  
// POST method to insert
app.post("/commandef", (req, res) => {
 
    const q = "INSERT INTO commandef (`date`, `etat`, `id_fournisseur`) VALUES (CURDATE(),?)";
    const values = [req.body.etat, req.body.id_fournisseur];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);

        const commandId = data.insertId;

        const produits = req.body.produits;
        if (!produits || produits.length === 0) {
            return res.json("commandef has been added successfully without products!");
        }

        const produitQueries = produits.map(p => {
            return new Promise((resolve, reject) => {
                const qProduit = "INSERT INTO produit_cf (`id_cf`, `id_produit`, `quantite`) VALUES (?)";
                const produitValues = [commandId, p.id_produit, p.quantite];

                db.query(qProduit, [produitValues], (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        });

        Promise.all(produitQueries)
            .then(() => res.json("commandef and products have been added successfully!"))
            .catch(err => res.json(err));
    });
});
//PUT accept
app.put("/commandef/accept/:id", (req, res) => {
    const commandefId = req.params.id;
    const etat="acceptée";
    const date=req.body.date_possible;

    const q = "UPDATE commandef SET etat = ? , date_possible= ? WHERE id = ?";

    db.query(q, [ etat, date,  commandefId], (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows === 0) return res.status(404).json({ message: "commande fournisseur introuvable" });
 
             else {
                res.json("commande fournisseur has been updated successfully  !");
            }
        });
    });
//put recue
app.put("/commandef/recue/:id", (req, res) => {
    const commandefId = req.params.id;
    const etat = "reçue";
  
    // Met à jour l'état et la date de réception dans la table `commandef`
    const updateCommandefQuery = "UPDATE commandef SET etat = ?, date_reçue = CURDATE() WHERE id = ?";
  
    db.query(updateCommandefQuery, [etat, commandefId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0) return res.status(404).json({ message: "Commande fournisseur introuvable" });
  
      // Récupère les produits et leurs quantités associés à la commande depuis le pivot `produit_cf`
      const getCommandProductsQuery = `
        SELECT p.id AS produitId, pcf.quantite
        FROM produit_cf pcf
        INNER JOIN produit p ON pcf.id_produit = p.id
        WHERE pcf.id_cf = ?
      `;
  
      db.query(getCommandProductsQuery, [commandefId], (err, products) => {
        if (err) return res.status(500).json(err);
  
        if (products.length === 0) return res.status(404).json({ message: "Aucun produit associé à cette commande" });
  
        // Met à jour les quantités dans la table `produit`
        const updateProductQuantityQuery = `
          UPDATE produit
          SET quantite = quantite + ?
          WHERE id = ?
        `;
  
        const updatePromises = products.map((product) => {
          return new Promise((resolve, reject) => {
            db.query(updateProductQuantityQuery, [product.quantite, product.produitId], (err, result) => {
              if (err) reject(err);
              else resolve(result);
            });
          });
        });
  
        Promise.all(updatePromises)
          .then(() => {
            res.json("La commande a été mise à jour et les quantités des produits ont été ajustées avec succès !");
          })
          .catch((err) => {
            res.status(500).json({ message: "Erreur lors de la mise à jour des quantités des produits", error: err });
          });
      });
    });
  });
  
// DELETE method to delete commandef and associated products
app.delete("/commandef/:id", (req, res) => {
    const commandefId = req.params.id;

    const deleteProductsQuery = "DELETE FROM produit_cf WHERE id_cf = ?";
    db.query(deleteProductsQuery, [commandefId], (err) => {
        if (err) return res.json(err);

        const deleteCommandQuery = "DELETE FROM commandef WHERE id = ?";
        db.query(deleteCommandQuery, [commandefId], (err, data) => {
            if (err) return res.json(err);
            if (data.affectedRows === 0) return res.status(404).json({ message: "commande fournisseur introuvable" });

            res.json("commande fournisseur and associated products have been deleted successfully!");
        });
    });
});



//7.stock
//get product of depot
app.get("/stock", (req, res) => {
     const q = `
        SELECT produit.* ,depot.adresse as adresse
        from produit join depot on produit.id_depot=depot.id `;

    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get("/es/:filter", (req, res) => {
    const filter = req.params.filter; // Le filtre envoyé depuis le frontend
    const validFilters = ["Dernière semaine", "Dernier mois", "Dernière année", "Dernier jour"];
    if (!validFilters.includes(filter)) {
      return res.status(400).json({ message: "Filtre invalide" });
    }
  
    const currentDate = new Date();
    let filteredDate = new Date();
  
    // Logique pour déterminer la période en fonction du filtre
    if (filter === "Dernière semaine") {
      filteredDate.setDate(currentDate.getDate() - 7);
    } else if (filter === "Dernier mois") {
      filteredDate.setMonth(currentDate.getMonth() - 1);
    } else if (filter === "Dernière année") {
      filteredDate.setFullYear(currentDate.getFullYear() - 1);
    } else if (filter === "Dernier jour") {
      filteredDate = new Date(); // Aujourd'hui
    }
  
    // Format de la date pour SQL
    const formattedDate = filteredDate.toISOString().split("T")[0];
  
    // Requête SQL pour récupérer les entrées et sorties
    const queryEntrées = `
      SELECT SUM(pd.quantite) AS total_quantite
      FROM produit p
      JOIN produit_cf pd ON p.id = pd.id_produit
      JOIN commandef cf ON pd.id_cf = cf.id
      WHERE cf.etat = 'reçue' 
        AND (cf.date_reçue >= ? OR cf.date >= ?);
    `;
  
    const querySorties = `
      SELECT SUM(pc.quantite) AS total_quantite
      FROM produit p
      JOIN produit_cc pc ON p.id = pc.id_produit
      JOIN commandec cc ON pc.id_cc = cc.id
      WHERE cc.etat = 'livré' 
        AND (cc.date >= ? OR cc.date >= ?);
    `;
  
    // Exécuter les requêtes
    db.query(queryEntrées, [formattedDate, formattedDate], (err, resultEntrées) => {
      if (err) {
        console.error("Erreur lors de la récupération des entrées:", err);
        return res.status(500).json({ message: "Erreur serveur lors de la récupération des entrées" });
      }
  
      db.query(querySorties, [formattedDate, formattedDate], (err, resultSorties) => {
        if (err) {
          console.error("Erreur lors de la récupération des sorties:", err);
          return res.status(500).json({ message: "Erreur serveur lors de la récupération des sorties" });
        }
  
        res.json({
          entrées: resultEntrées.length > 0 ? resultEntrées[0].total_quantite || 0 : 0,
          sorties: resultSorties.length > 0 ? resultSorties[0].total_quantite || 0 : 0,
        });
      });
    });
  });
  
 
 



//8.categorie 
//get all
app.get("/categorie", (req, res) => {
    db.query("SELECT * FROM categorie", (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des données :", err);
        res.status(500).send("Erreur lors de la récupération des données");
      } else {
        res.json(results);
      }
    });
  });
//get categorie specific
app.get("/categorie/:id", (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM categorie where id= ?", [id],(err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des données :", err);
        res.status(500).send("Erreur lors de la récupération des données");
      } else {
        res.json(results);
      }
    });
  });
  //get product categorie
app.get("/categorie_details/:id", (req, res) => {
    const id = req.params.id;
  
    // Requête SQL pour récupérer la catégorie et ses produits associés
    const query = `
    SELECT p.* , c.nom as categorie_nom from produit p join categorie c on p.id_categorie=c.id where id_categorie= ? 
  `;
  
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des détails :", err);
        return res.status(500).json({ message: "Erreur serveur" });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: "Catégorie non trouvée" });
      }
  
      // Retourne les résultats directement sans transformation
      res.json(results);
    });
  });
// Ajouter une catégorie
app.post("/categorie", (req, res) => {
    const { nom } = req.body;
    if (!nom) {
      return res.status(400).send("Le champ nom est requis");
    }
    db.query("INSERT INTO categorie (nom) VALUES (?)", [nom], (err, results) => {
      if (err) {
        console.error("Erreur lors de l'ajout :", err);
        res.status(500).send("Erreur lors de l'ajout");
      } else {
        res.send("Catégorie ajoutée avec succès !");
      }
    });
  }); 
  // Modifier une catégorie
  app.put("/categorie/:id",  (req, res) => {
    const { id } = req.params;
    const { nom } = req.body;
    if (!nom) {
      return res.status(400).send("Le champ nom est requis");
    }
    db.query(
      "UPDATE categorie SET nom = ? WHERE id = ?",
      [nom, id],
      (err, results) => {
        if (err) {
          console.error("Erreur lors de la modification :", err);
          res.status(500).send("Erreur lors de la modification");
        } else {
          res.send("Catégorie modifiée avec succès !");
        }
      }
    );
  });
  // Supprimer une catégorie
  app.delete("/categorie/:id",  (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM categorie WHERE id = ?", [id], (err, results) => {
      if (err) {
        console.error("Erreur lors de la suppression :", err);
        res.status(500).send("Erreur lors de la suppression");
      } else {
        res.send("Catégorie supprimée avec succès !");
      }
    });
  });



//9.product
//get all product
app.get("/products", (req, res) => {
  const query = `
    SELECT p.id, p.nom, p.description, p.prix, p.quantite, p.imgurl, 
           p.id_categorie, c.nom AS categorie_nom, p.id_depot, d.adresse AS depot_adresse, 
           GROUP_CONCAT(pf.id_fournisseur) AS fournisseurs
    FROM produit p
    JOIN categorie c ON p.id_categorie = c.id
    JOIN depot d ON p.id_depot = d.id
    LEFT JOIN fournir pf ON p.id = pf.id_produit
    GROUP BY p.id;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des produits :", err);
      res.status(500).send("Erreur serveur");
      return;
    }
    res.json(results.map(product => ({
      ...product,
      fournisseurs: product.fournisseurs ? product.fournisseurs.split(',') : []
    })));
  });
});
// Supprimer un produit
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  // Vérifiez que l'ID est fourni et valide
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "ID du produit invalide ou manquant." });
  }

  // Supprimer le produit de la table "produit"
  const deleteProductQuery = `DELETE FROM produit WHERE id = ?`;
  db.query(deleteProductQuery, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression du produit :", err);
      return res.status(500).json({ message: "Erreur serveur lors de la suppression du produit." });
    }

    // Vérifiez si un produit a été effectivement supprimé
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produit introuvable ou déjà supprimé." });
    }

    // Réponse de succès
    res.status(200).json({ message: "Produit supprimé avec succès." });
  });
});
// Ajouter un produit et ses relations avec les fournisseurs
app.post("/products", (req, res) => {
  const { name, description, price, quantity, imgurl, categoryId, suppliers = [], depotId } = req.body;

  // Vérification des données obligatoires
  if (!name || !description || !price || !quantity || !imgurl || !categoryId || !depotId) {
    return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
  }

  // Insérer le produit
  const insertProductQuery = `
    INSERT INTO produit (nom, description, prix, imgurl, quantite, id_categorie, id_depot) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(insertProductQuery, [name, description, price, imgurl, quantity, categoryId, depotId], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout du produit :", err);
      return res.status(500).json({ message: "Erreur serveur lors de l'ajout du produit." });
    }

    const productId = result.insertId;

    // Si des fournisseurs sont spécifiés, les insérer dans la table "fournir"
    if (suppliers.length > 0) {
      const insertSuppliersQuery = `
        INSERT INTO fournir (id_produit, id_fournisseur) 
        VALUES ?
      `;
      const supplierValues = suppliers.map((supplierId) => [productId, supplierId]);

      db.query(insertSuppliersQuery, [supplierValues], (err) => {
        if (err) {
          console.error("Erreur lors de l'ajout des fournisseurs :", err);
          return res.status(500).json({ message: "Erreur serveur lors de l'ajout des fournisseurs." });
        }
        res.status(201).json({ message: "Produit et fournisseurs ajoutés avec succès." });
      });
    } else {
      res.status(201).json({ message: "Produit ajouté avec succès (aucun fournisseur lié)." });
    }
  });
});
// Mettre à jour un produit
app.put("/products/:id", (req, res) => {
  const { id } = req.params; // ID du produit à mettre à jour
  const { nom, description, prix, quantite, imgurl, id_categorie, id_depot, fournisseurs = [] } = req.body;

  // Vérification des données obligatoires
  if (!nom || !description || !prix || !quantite || !imgurl || !id_categorie || !id_depot) {
    return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
  }

  // Mise à jour du produit
  const updateProductQuery = `
    UPDATE produit
    SET nom = ?, description = ?, prix = ?, quantite = ?, imgurl = ?, 
        id_categorie = ?, id_depot = ?
    WHERE id = ?
  `;

  db.query(updateProductQuery, [nom, description, prix, quantite, imgurl, id_categorie, id_depot, id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la mise à jour du produit :", err);
      return res.status(500).json({ message: "Erreur serveur lors de la mise à jour du produit." });
    }

    // Supprimer les anciens fournisseurs associés
    const deleteFournisseursQuery = `DELETE FROM fournir WHERE id_produit = ?`;

    db.query(deleteFournisseursQuery, [id], (err) => {
      if (err) {
        console.error("Erreur lors de la suppression des anciens fournisseurs :", err);
        return res.status(500).json({ message: "Erreur serveur lors de la mise à jour des fournisseurs." });
      }

      // Ajouter les nouveaux fournisseurs si spécifiés
      if (fournisseurs.length > 0) {
        const insertFournisseursQuery = `INSERT INTO fournir (id_produit, id_fournisseur) VALUES ?`;
        const fournisseurValues = fournisseurs.map((fournisseurId) => [id, fournisseurId]);

        db.query(insertFournisseursQuery, [fournisseurValues], (err) => {
          if (err) {
            console.error("Erreur lors de l'ajout des fournisseurs :", err);
            return res.status(500).json({ message: "Erreur serveur lors de l'ajout des fournisseurs." });
          }

          return res.status(200).json({ message: "Produit et fournisseurs mis à jour avec succès." });
        });
      } else {
        return res.status(200).json({ message: "Produit mis à jour avec succès (aucun fournisseur lié)." });
      }
    });
  });
});
//recuperation d'un produit par l'id
app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  const queryProduct = `
    SELECT p.*, c.nom AS categorie_nom, d.adresse AS depot_adresse
    FROM produit p
    LEFT JOIN categorie c ON p.id_categorie = c.id
    LEFT JOIN depot d ON p.id_depot = d.id
    WHERE p.id = ?
  `;

  const queryFournisseurs = `
    SELECT f.id_fournisseur, fr.nomcomplet AS fournisseur_nom
    FROM fournir f
    JOIN fournisseur fr ON f.id_fournisseur = fr.id
    WHERE f.id_produit = ?
  `;

  db.query(queryProduct, [id], (err, productResults) => {
    if (err) {
      console.error("Erreur lors de la récupération du produit :", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    if (productResults.length === 0) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    const product = productResults[0];

    db.query(queryFournisseurs, [id], (err, fournisseurResults) => {
      if (err) {
        console.error("Erreur lors de la récupération des fournisseurs :", err);
        return res.status(500).json({ message: "Erreur serveur" });
      }

      product.fournisseurs = fournisseurResults; // Ajoutez les fournisseurs dans la réponse
      res.json(product);
    });
  });
});




//1.facture
// get all facture
app.get("/factures", (req, res) => {
  const query = `
 SELECT 
  f.id AS facture_id,
  cf.id AS id_commandefournisseur,
  fo.nomcomplet AS fournisseur_nom,
  fo.email AS fournisseur_email,
  GROUP_CONCAT(DISTINCT p.nom SEPARATOR ', ') AS produits,
  GROUP_CONCAT(DISTINCT p.prix SEPARATOR ', ') AS prix_unitaires,
  GROUP_CONCAT(pcf.quantite SEPARATOR ', ') AS quantites, -- Pas de DISTINCT ici
  f.prixTotal AS prix_total,
  f.date AS date_facture
FROM facture f
JOIN commandef cf ON f.id_commandef = cf.id
JOIN produit_cf pcf ON pcf.id_cf = cf.id
JOIN fournisseur fo ON cf.id_fournisseur = fo.id
JOIN produit p ON pcf.id_produit = p.id -- Utilisation directe de produit_cf pour éviter doublons
GROUP BY f.id;

  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des factures :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.json(results);
  });
});

//get specific facture
app.get("/factures/:id", (req, res) => {
  const factureId = req.params.id;
  const query = `
    SELECT * FROM facture WHERE id = ?
  `;
  db.query(query, [factureId], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération de la facture :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Facture non trouvée." });
    }
    res.json(results[0]);
  });
});
//get details facture
app.get("/facturesdet/:id", (req, res) => {
  const { id } = req.params;

  const queryFacture = `
    SELECT 
      f.id AS facture_id,
      cf.id AS id_commandefournisseur,
      fo.nomcomplet AS fournisseur_nom,
      fo.email AS fournisseur_email,
      GROUP_CONCAT(p.nom SEPARATOR ', ') AS produits,
      GROUP_CONCAT(p.prix SEPARATOR ', ') AS prix_unitaires,
      GROUP_CONCAT(pcf.quantite SEPARATOR ', ') AS quantites,
      f.prixTotal AS prix_total,
      f.date AS date_facture
    FROM facture f
    JOIN commandef cf ON f.id_commandef = cf.id
    JOIN produit_cf pcf ON pcf.id_cf = cf.id
    JOIN fournisseur fo ON cf.id_fournisseur = fo.id
    JOIN produit p ON pcf.id_produit = p.id
    WHERE f.id = ? -- Filtrer par ID de la facture
    GROUP BY f.id;

  `;

  db.query(queryFacture, [id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des données de la facture :", err);
      res.status(500).json({ error: "Erreur serveur" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Facture non trouvée" });
    } else {
      res.json(results[0]);
    }
  });
});
//post
app.post("/factures", (req, res) => {
  console.log("Données reçues :", req.body);
  const { date, id_commandef } = req.body;

  // Récupérer les produits et quantités
  const queryCommandeProduits = `
    SELECT cp.id_produit, cp.quantite, p.prix 
    FROM produit_cf cp
    INNER JOIN produit p ON cp.id_produit = p.id
    WHERE cp.id_cf = ?;
  `;

  db.query(queryCommandeProduits, [id_commandef], (err, produits) => {
    if (err) {
      console.error("Erreur lors de la récupération des produits :", err);
      return res.status(500).json({ error: "Erreur serveur lors de la récupération des produits." });
    }

    if (!produits.length) {
      console.error("Aucun produit trouvé pour cette commande.");
      return res.status(404).json({ error: "Aucun produit trouvé pour cette commande fournisseur." });
    }

    // Calculer le prix total
    const prixTotal = produits.reduce((sum, { prix, quantite }) => sum + prix * quantite, 0);
    console.log("Prix total calculé :", prixTotal);

    // Insérer la facture
    const queryInsertFacture = `
      INSERT INTO facture (date, prixTotal, id_commandef) 
      VALUES (?, ?, ?);
    `;

    db.query(queryInsertFacture, [date, prixTotal, id_commandef], (err, resultFacture) => {
      if (err) {
        console.error("Erreur lors de l'insertion de la facture :", err);
        return res.status(500).json({ error: "Erreur serveur lors de l'insertion de la facture." });
      }

      const factureId = resultFacture.insertId;
      console.log("Facture insérée avec succès, ID :", factureId);

      // Insérer les produits dans produit_facture (éviter doublons)
      const queryInsertProduitFacture = `
        INSERT INTO produit_facture (produit_id, facture_id) 
        VALUES (?, ?);
      `;
      const queryCheckProduitFacture = `
        SELECT 1 
        FROM produit_facture 
        WHERE produit_id = ? AND facture_id = ?;
      `;

      const produitFacturePromises = produits.map(({ id_produit }) =>
        new Promise((resolve, reject) => {
          // Vérifier si le produit existe déjà pour cette facture
          db.query(queryCheckProduitFacture, [id_produit, factureId], (err, rows) => {
            if (err) {
              console.error("Erreur lors de la vérification :", err);
              return reject(err);
            }

            if (rows.length === 0) {
              // Insérer seulement si le produit n'existe pas encore
              db.query(queryInsertProduitFacture, [id_produit, factureId], (err) => {
                if (err) {
                  console.error("Erreur lors de l'insertion dans produit_facture :", err);
                  return reject(err);
                }
                resolve();
              });
            } else {
              resolve(); // Le produit existe déjà, ne rien faire
            }
          });
        })
      );

      Promise.all(produitFacturePromises)
        .then(() => {
          res.status(201).json({ message: "Facture ajoutée avec succès", factureId });
        })
        .catch((err) => {
          console.error("Erreur lors de l'insertion des produits :", err);
          res.status(500).json({ error: "Erreur serveur lors de l'insertion des produits." });
        });
    });
  });
});
//put
app.put("/factures/:id", (req, res) => {
  console.log("ID reçu :", req.params.id);
  console.log("Données reçues :", req.body);

  const factureId = req.params.id;
  const { date, id_commandef } = req.body;

  // Étape 1 : Mettre à jour la table facture
  const updateFactureQuery = `
    UPDATE facture 
    SET date = ?, id_commandef = ? 
    WHERE id = ?
  `;

  db.beginTransaction((err) => {
    if (err) {
      console.error("Erreur lors du début de la transaction :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    db.query(updateFactureQuery, [date, id_commandef, factureId], (err) => {
      if (err) {
        console.error("Erreur lors de la mise à jour de la facture :", err);
        return db.rollback(() => {
          res.status(500).json({ error: "Erreur serveur" });
        });
      }

      // Étape 2 : Supprimer les anciens produits associés à la facture
      const deleteProduitFactureQuery = `
        DELETE FROM produit_facture WHERE facture_id = ?
      `;

      db.query(deleteProduitFactureQuery, [factureId], (err) => {
        if (err) {
          console.error("Erreur lors de la suppression des produits associés :", err);
          return db.rollback(() => {
            res.status(500).json({ error: "Erreur serveur" });
          });
        }

        // Étape 3 : Ajouter les nouveaux produits associés depuis commandef_produit
        const insertProduitFactureQuery = `
          INSERT INTO produit_facture (produit_id, facture_id)
          SELECT id_produit, ?
          FROM produit_cf
          WHERE id_cf = ?
        `;

        db.query(insertProduitFactureQuery, [factureId, id_commandef], (err) => {
          if (err) {
            console.error("Erreur lors de l'insertion des nouveaux produits :", err);
            return db.rollback(() => {
              res.status(500).json({ error: "Erreur serveur" });
            });
          }

          // Étape 4 : Calculer et mettre à jour le prixTotal
          const updatePrixTotalQuery = `
            UPDATE facture f
            JOIN produit_facture pf ON f.id = pf.facture_id
            JOIN produit_cf pcf ON pf.produit_id = pcf.id_produit
            JOIN produit p ON pf.produit_id = p.id
            SET f.prixTotal = (
              SELECT SUM(p.prix * pcf.quantite)
              FROM produit_cf pcf
              JOIN produit p ON pcf.id_produit = p.id
              WHERE pcf.id_cf = ?
            )
            WHERE f.id = ?
          `;

          db.query(updatePrixTotalQuery, [id_commandef, factureId], (err) => {
            if (err) {
              console.error("Erreur lors de la mise à jour du prixTotal :", err);
              return db.rollback(() => {
                res.status(500).json({ error: "Erreur serveur" });
              });
            }

            // Étape 5 : Valider la transaction
            db.commit((err) => {
              if (err) {
                console.error("Erreur lors de la validation de la transaction :", err);
                return db.rollback(() => {
                  res.status(500).json({ error: "Erreur serveur" });
                });
              }

              res.json({
                message: "Facture mise à jour avec succès, produits associés actualisés !",
              });
            });
          });
        });
      });
    });
  });
});
//delete
app.delete("/factures/:id", (req, res) => {
  const { id: factureId } = req.params; // Récupérer l'ID de la facture à partir des paramètres

  // Supprimer les relations dans la table produit_facture
  const deleteProduitFactureQuery = "DELETE FROM produit_facture WHERE facture_id = ?";
  db.query(deleteProduitFactureQuery, [factureId], (err) => {
    if (err) {
      console.error("Erreur lors de la suppression des relations produit_facture :", err);
      res.status(500).json({ message: "Erreur serveur lors de la suppression des relations produit_facture." });
      return;
    }

    // Supprimer la facture dans la table facture
    const deleteFactureQuery = "DELETE FROM facture WHERE id = ?";
    db.query(deleteFactureQuery, [factureId], (err, result) => {
      if (err) {
        console.error("Erreur lors de la suppression de la facture :", err);
        res.status(500).json({ message: "Erreur serveur lors de la suppression de la facture." });
      } else if (result.affectedRows === 0) {
        // Si aucune ligne n'a été supprimée, la facture n'existe pas
        res.status(404).json({ message: "Facture non trouvée." });
      } else {
        res.status(200).json({ message: "Facture supprimée avec succès !" });
      }
    });
  });
});
//product of commandef
app.get("/commandesf/:id/produits", (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT cp.id_produit, cp.quantite, p.prix, p.nom
    FROM produit_cf cp
    INNER JOIN produit p ON cp.id_produit = p.id
    WHERE cp.id_cf = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des produits :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.json(results);
  });
});















//listen to any request to 8800
app.listen(8800, () => {
    console.log("Connected to backend!");
});

