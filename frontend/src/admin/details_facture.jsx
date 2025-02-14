import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des détails de la facture :", error);
                setLoading(false);
            }
        };

        fetchFactureDetails();
    }, [id]);

    const generatePDF = () => {
        const doc = new jsPDF();

        // Ajouter un titre au PDF
        doc.setFontSize(18);
        doc.text("Facture", 14, 20);

        // Ajouter les informations générales
        doc.setFontSize(12);
        doc.text(`Date : ${facture.date_facture && new Date(facture.date_facture).toLocaleDateString('fr-FR') }`, 14, 30);
        doc.text(`Nom du Fournisseur : ${facture.fournisseur_nom}`, 14, 40);
        doc.text(`Email du Fournisseur : ${facture.fournisseur_email}`, 14, 50);
        doc.text(`Prix Total : ${facture.prix_total} €`, 14, 60);

        // Ajouter le tableau des produits
        const tableData = facture.produits.split(", ").map((produit, index) => [
            produit,
            facture.quantites.split(", ")[index],
            `${facture.prix_unitaires.split(", ")[index]} €`,
            `${parseFloat(facture.prix_unitaires.split(", ")[index]) *
            parseInt(facture.quantites.split(", ")[index], 10)
            } €`,
        ]);

        doc.autoTable({
            startY: 70,
            head: [["Nom du Produit", "Quantité", "Prix Unitaire", "Prix Total"]],
            body: tableData,
        });

        // Ajouter le tableau pour le total
        doc.autoTable({
            startY: doc.lastAutoTable.finalY + 10,
            head: [["Total HT"]],
            body: [[`${facture.prix_total} €`]],
            theme: "grid", // Pour ajouter les bordures comme dans votre exemple
        });

        // Ajouter les conditions de paiement
        doc.text("Conditions de paiement :", 14, doc.lastAutoTable.finalY + 10);
        doc.text(
            "Paiement à réception de la facture, à 30 jours. Tout retard de paiement entraînera une pénalité de 40 €.",
            14,
            doc.lastAutoTable.finalY + 20
        );

        // Télécharger le PDF
        doc.save("Facture.pdf");
    };


    if (loading) {
        return <div>Chargement des données...</div>;
    }

    if (!facture) {
        return <div>Aucune facture trouvée.</div>;
    }

    return (
        <div style={{ marginLeft:"350px"}} className="container mt-5">
            <h1>Détails de la Facture</h1>
            <Link to="/admin/facture" className="btn   mb-3" style={{border:"1px solid rgb(175, 76, 101)" ,background:"white" , color:"rgb(175, 76, 101)"}}>
                Retour à la liste des factures
            </Link>
            <div>
                <h3>Informations Générales</h3>
                <p><strong>Date :</strong>  {facture.date_facture && new Date(facture.date_facture).toLocaleDateString('fr-FR') }</p>
                <p><strong>Nom du Fournisseur :</strong> {facture.fournisseur_nom}</p>
                <p><strong>Email du Fournisseur :</strong> {facture.fournisseur_email}</p>
                <p><strong>Prix Total :</strong> {facture.prix_total} €</p>
            </div>
            <div>
                <h3>Produits</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nom du Produit</th>
                            <th>Quantité</th>
                            <th>Prix Unitaire</th>
                            <th>Prix Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facture.produits.split(", ").map((produit, index) => (
                            <tr key={index}>
                                <td>{produit}</td>
                                <td>{facture.quantites.split(", ")[index]}</td>
                                <td>{facture.prix_unitaires.split(", ")[index]} €</td>
                                <td>
                                    {(
                                        parseFloat(facture.prix_unitaires.split(", ")[index]) *
                                        parseInt(facture.quantites.split(", ")[index], 10)
                                    ).toFixed(2)}{" "}
                                    €
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Section des informations complémentaires */}
            <div className="mt-5">
                <h3>Total et Informations Complémentaires</h3>
                <table className="table table-bordered" style={{ maxWidth: "300px" }}>
                    <tbody>
                        <tr>
                            <td><strong>Total HT</strong></td>
                            <td>{facture.prix_total} €</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    <strong>Conditions de paiement :</strong> paiement à réception de la facture, à 30 jours.
                </p>
                <p>
                    Tout retard de paiement entraînera une pénalité de 40 €.
                </p>
            </div>
            <button className="btn   mt-3" onClick={generatePDF} style={{background:"rgb(175, 76, 101)" , color:"white"}}>
                Télécharger la Facture en PDF
            </button>
        </div>
    );
};

export default Details_facture;