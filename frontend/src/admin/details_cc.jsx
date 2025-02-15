import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Details_facture = () => {
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
    doc.setFontSize(18);
    doc.text("Facture", 14, 20);
    doc.setFontSize(12);
    doc.text(`Date : ${facture.date_facture && new Date(facture.date_facture).toLocaleDateString('fr-FR')}`, 14, 30);
    doc.text(`Fournisseur : ${facture.fournisseur_nom}`, 14, 40);
    doc.text(`Email : ${facture.fournisseur_email}`, 14, 50);
    doc.text(`Prix Total : ${facture.prix_total} €`, 14, 60);

    const tableData = facture.produits.split(", ").map((produit, index) => [
      produit,
      facture.quantites.split(", ")[index],
      `${facture.prix_unitaires.split(", ")[index]} €`,
      `${(parseFloat(facture.prix_unitaires.split(", ")[index]) * parseInt(facture.quantites.split(", ")[index], 10)).toFixed(2)} €`
    ]);

    doc.autoTable({ startY: 70, head: [["Produit", "Quantité", "Prix U.", "Total"]], body: tableData });

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Total HT"]],
      body: [[`${facture.prix_total} €`]],
      theme: "grid",
    });

    doc.text("Conditions de paiement :", 14, doc.lastAutoTable.finalY + 10);
    doc.text("Paiement à 30 jours. Retard = pénalité de 40 €.", 14, doc.lastAutoTable.finalY + 20);
    doc.save("Facture.pdf");
  };

  if (loading) return <div className="text-center mt-5">Chargement...</div>;
  if (!facture) return <div className="text-center mt-5">Aucune facture trouvée.</div>;

  return (
    <div className="container mt-5 d-flex justify-content-center" style={{ marginLeft: "250px" }}>
      <div className="card shadow p-4" style={{ maxWidth: "900px", width: "100%" }}>
        <h3 className="text-center mb-4">Détails de la Facture</h3>

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
          <table className="table table-striped table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix U.</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {facture.produits.split(", ").map((produit, index) => (
                <tr key={index}>
                  <td>{produit}</td>
                  <td>{facture.quantites.split(", ")[index]}</td>
                  <td>{facture.prix_unitaires.split(", ")[index]} €</td>
                  <td>
                    {(parseFloat(facture.prix_unitaires.split(", ")[index]) *
                      parseInt(facture.quantites.split(", ")[index], 10)).toFixed(2)} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total et Conditions */}
        <div className="mt-4">
          <h5 className="mb-3">Total et Conditions</h5>
          <table className="table table-bordered text-center" style={{ maxWidth: "300px", margin: "0 auto" }}>
            <tbody>
              <tr>
                <td><strong>Total HT</strong></td>
                <td>{facture.prix_total} €</td>
              </tr>
            </tbody>
          </table>
          <p className="text-center">
            <strong>Conditions de paiement :</strong> paiement sous 30 jours.  
            Retard = pénalité de 40 €.
          </p>
        </div>

        {/* Bouton de téléchargement */}
        <div className="text-center mt-4">
          <button className="btn btn-dark px-4" onClick={generatePDF}>
            Télécharger la Facture en PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details_facture;
