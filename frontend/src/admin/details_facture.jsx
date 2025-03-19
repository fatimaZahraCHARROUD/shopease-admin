import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//jsPDF et jspdf-autotable : Utilisés pour générer des fichiers PDF dynamiquement.
//  jsPDF est une bibliothèque qui permet de créer des documents PDF en JavaScript,
//  et jspdf-autotable permet d'ajouter des tableaux à ces PDF
import jsPDF from "jspdf";//biblio to print
import "jspdf-autotable";//tableau
import { Link, useNavigate } from "react-router-dom";

const Details_facture = () => {
  const userId = localStorage.getItem("adminId");
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!userId) {
        navigate('/signin');
      }
    }, [userId, navigate]);
    
  const { id } = useParams();
  const [facture, setFacture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFactureDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/facturesdet/${id}`);
        setFacture(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la facture :", error);
      }
      setLoading(false);
    };

    fetchFactureDetails();
  }, [id]);

  const generatePDF = () => {
    const doc = new jsPDF();
  
   
    // Informations de ShopEase
    doc.text(`ShopEase`, 14, 50);
    doc.text(`123 Rue hassan Al aarouit Nador, Maroc`, 14, 60);
    doc.text(`+212 5 22 33 44 55`, 14, 70);
  
    // Informations du fournisseur
    doc.text(`${facture.fournisseur_nom}`, 120, 90);
    doc.text(`${facture.fournisseur_email}`, 120, 100);
    doc.text(`Num ICE : 1234567890`, 120, 110); // Numéro ICE au lieu du prix total
  
     doc.text(`Facture n°FAC-${id} `, 14, 120);

    // Tableau des produits
    const tableData = facture.produits.split(", ").map((produit, index) => [
      produit,
      facture.quantites.split(", ")[index],
      `${facture.prix_unitaires.split(", ")[index]} DH`,
      `${(parseFloat(facture.prix_unitaires.split(", ")[index]) * parseInt(facture.quantites.split(", ")[index], 10)).toFixed(2)} DH`,
    ]);
  
    doc.autoTable({
      startY: 130,
      head: [["Produit", "Quantité", "Prix U", "Total"]],
      body: tableData,
      styles: { fontSize: 10, cellPadding: 5, textColor: "#333", halign: "center" },
      headStyles: { fillColor: "rgb(74,138,126)", textColor: "#fff" },
    });
  
    // Section Total HT
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Total HT"]],
      body: [[`${facture.prix_total} DH`]],
      theme: "plain",
      styles: { fontSize: 12, halign: "center" },
      headStyles: { fillColor: "rgb(74,138,126)", textColor: "#fff" },
    });
  
    // Conditions de paiement
    const conditions = [
       ["Délai de paiement", "30 jours fin de mois"],
      ["Clause de réserve de propriété", "Les marchandises restent la propriété du fournisseur jusqu’au paiement intégral."],
    ];
  
    doc.text("Conditions de paiement :", 14, doc.lastAutoTable.finalY + 10);
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 15,
      head: [["Condition", "Détail"]],
      body: conditions,
      styles: { fontSize: 10,   textColor: "#333" },
      headStyles: { fillColor: "#000", textColor: "#fff" },
    });     
 

  
    // Mentions légales supplémentaires dans le bas de la page
    doc.setFontSize(10);
    doc.setTextColor("#555");
    const pageWidth = doc.internal.pageSize.getWidth(); // Largeur de la page
const marginBottom = 10; // Marge par rapport au bas de la page

// Calcul de la position Y finale pour être juste au-dessus du bas
const finalY = doc.internal.pageSize.getHeight() - marginBottom;

doc.text(
  `Taxe professionnelle : 15% , Registre de commerce : RC12345`,
  pageWidth / 2, // Centre horizontalement
  finalY - 10,   // Ajustement vertical
  { align: "center" }
);

doc.text(
  `ICE : 1234567890 , Identifiant fiscal : 987654321`,
  pageWidth / 2, // Centre horizontalement
  finalY,        // Juste en dessous du premier texte
  { align: "center" }
);

    
    // Téléchargement
    doc.save("Facture.pdf");
  };
  
  

  if (loading) return <div className="text-center mt-5">Chargement...</div>;
  if (!facture) return <div className="text-center mt-5">Aucune facture trouvée.<Link to="/admin/facture" >ajouter une facture </Link></div>;

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
    <div style={{
      width: "100%",
      maxWidth: "600px", // Largeur max du formulaire
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "white",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
    }}>    <h3 className="text-center mb-4">Détails de la Facture {id}</h3>

        {/* Informations Générales */}
        <div className="mb-4">
          <h5 className="mb-3">Informations Générales</h5>
          <p><strong>Date :</strong> {new Date(facture.date_facture).toLocaleDateString('fr-FR')}</p>
          <p><strong>Fournisseur :</strong> {facture.fournisseur_nom}</p>
          <p><strong>Email :</strong> {facture.fournisseur_email}</p>
        </div>

        {/* Produits */}
        <h5 className="mb-3">Produits</h5>
        <div className="table-responsive">
          <table className="table    text-center">
            <thead className="table-dark">
              <tr>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Produit</th>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Quantité</th>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Prix U.</th>
                <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {facture.produits.split(", ").map((produit, index) => (
                <tr key={index}>
                  <td>{produit}</td>
                  <td>{facture.quantites.split(", ")[index]}</td>
                  <td>{facture.prix_unitaires.split(", ")[index]} DH</td>
                  <td>
                    {(parseFloat(facture.prix_unitaires.split(", ")[index]) *
                      parseInt(facture.quantites.split(", ")[index], 10)).toFixed(2)} DH
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total et Conditions */}
        <div className="mt-2">
           <table className="table table-bordered text-center" style={{ maxWidth: "300px", margin: "0 auto" }}>
            <tbody>
              <tr>
                <td><strong>Total  </strong></td>
                <td>{facture.prix_total} DH</td>
              </tr>
            </tbody>
          </table>

         {/* Section Conditions de Paiement & Mentions Légales */}
<div className="mt-5">
  <h3>Conditions de Paiement</h3>
  <div style={{   }}>
    <p><strong>Mode de paiement :</strong> À la livraison</p>
    <p>
      <strong>Coordonnées bancaires :</strong> IBAN : FR76 1234 5678 9012 3456 7890 123 |
      SWIFT : ABCD1234
    </p>
    <p><strong>Délai de paiement :</strong> 30 jours fin de mois</p>
    <p>
      <strong>Clause de réserve de propriété :</strong> Les marchandises restent
      la propriété du fournisseur jusqu’au paiement intégral.
    </p>
    <p>
      <strong>Mentions légales :</strong> En cas de litige, toute réclamation
      doit être signalée sous <strong>7 jours</strong> après réception de la commande.
    </p>
  </div>
</div>

        </div>

        {/* Bouton de téléchargement */}
        <div className="text-center mt-4">
          <button style={{ backgroundColor:"rgb(74,138,126)" , color:"white"}} className="btn  px-4" onClick={generatePDF}>
            Télécharger la Facture en PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details_facture;
