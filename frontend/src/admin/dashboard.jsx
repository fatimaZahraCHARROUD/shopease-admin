import React, { useState, useEffect } from "react";
import axios from "axios";
//recharts : Une bibliothèque pour afficher des graphiques, ici utilisée pour afficher des graphiques circulaires (camemberts) et des graphiques à barres.
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Bar, Line } from "react-chartjs-2";
//chart.js : Une bibliothèque de graphiques qui est utilisée ici pour afficher des graphiques linéaires
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend as ChartLegend } from "chart.js";
import {  useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, ChartTooltip, ChartLegend);

//circulaire
const COLORS = ["rgb(126, 176, 170)",  "rgb(166, 202, 197)",   "rgb(206, 228, 224)",   "rgb(226, 240, 237)",   "rgb(239, 250, 248)"    ]
//client par ville
const COLORS_BAR = ["rgb(126, 176, 170)", "rgb(126, 176, 170)", "rgb(126, 176, 170)", "rgb(126, 176, 170)", "rgb(126, 176, 170)", "rgb(126, 176, 170)"];

const Dashboard = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/signin');
    }
  }, [userId, navigate]);
  
  const currentYear = new Date().getFullYear(); // Année actuelle
  const [selectedYear, setSelectedYear] = useState(currentYear); // État du filtre année
  const [totalAchats, setTotalAchats] = useState(0);
  const [totalVentes, setTotalVentes] = useState(0);
  const [totalFournisseurs, setTotalFournisseurs] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [salesData, setSalesData] = useState(Array(12).fill(0));
  const [clientsData, setClientsData] = useState(Array(12).fill(0));
  const [data, setData] = useState([]);
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    // Fetch the total data
    axios.get("http://localhost:8800/api/dashboard/total-achats").then(res => setTotalAchats(res.data.totalAchats || 0));
    axios.get("http://localhost:8800/api/dashboard/total-ventes").then(res => setTotalVentes(res.data.totalVentes || 0));
    axios.get("http://localhost:8800/api/dashboard/total-fournisseurs").then(res => setTotalFournisseurs(res.data.totalFournisseurs || 0));
    axios.get("http://localhost:8800/api/dashboard/total-clients").then(res => setTotalClients(res.data.totalClients || 0));

    // Fetch data for sales and clients by month
    axios.get(`http://localhost:8800/api/dashboard/ventes?annee=${selectedYear}`).then(res => {
      const sales = Array(12).fill(0);
      res.data.forEach(sale => sales[sale.mois - 1] = sale.total_vente);
      setSalesData(sales);
    });

    axios.get(`http://localhost:8800/api/dashboard/clients-per-month?annee=${selectedYear}`).then(res => {
      const clients = Array(12).fill(0);
      res.data.forEach(item => clients[item.mois - 1] = item.total_clients);
      setClientsData(clients);
    });

    axios.get(`http://localhost:8800/api/dashboard/top-categories?annee=${selectedYear}`).then(res => setData(res.data));

    // Fetch city data for the clients' distribution
    axios.get(`http://localhost:8800/api/dashboard/clients-by-city?year=${selectedYear} `).then(response => setCityData(response.data));
  }, [selectedYear]);


 //📘📘Définition des données du graphique des ventes
  const chartDataSales = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
    datasets: [{
      label: "Ventes en (DH)",
      data: salesData,
      backgroundColor: "rgb(206,228,224)",
    }]
  };

  //📘📘Définition des données pour le graphique des clients
  const clientsChartData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
    datasets: [{
      label: "Clients et visiteurs ",
      data: clientsData,
      borderColor: "rgb(74,138,126)",
      backgroundColor: "rgb(74,138,126)",
      pointBackgroundColor: "rgb(74,138,126)",
      pointBorderColor: "#fff",
      fill: true,
    }]
  };

//📘📘options pour le graphique des clients
  const clientsOptions = {
    responsive: true,
    plugins: {
      title: { display: true, text: `Total des  visiteurs par mois en ${selectedYear} `},
      legend: { display: true }
    },
    elements: {
      line: { tension: 0.4 }
    },
    scales: {
      x: { title: { display: true, text: "Mois" } },
      y: {
        title: { display: true, text: "Nombre de clients et visiteurs" },
        beginAtZero: true,
        ticks: { stepSize: 1 }
      }
    }
  };

//📘📘Calcul du total des clients pour le graphique de distribution par ville   const totalCityClients = cityData.reduce((sum, item) => sum + item.total_clients, 0);
const totalCityClients = cityData.reduce((sum, item) => sum + item.total_clients, 0);

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* CSS pour la responsivité */}
      <style>
        {`
          @media (max-width: 768px) {
            .dashboard-container {
              margin-left: 0 !important;
              padding: 10px !important;
            }
            
            .chart-title {
              font-size: 14px !important;
            }
            
            .stats-card p {
              font-size: 11px !important;
              margin-bottom: 5px !important;
            }
            
            .city-label {
              min-width: 70px !important;
              font-size: 14px !important;
            }
            
            .year-filter {
              padding: 8px !important;
              margin: 10px 0 !important;
              display: flex !important;
              justify-content: center !important;
              align-items: center !important;
            }
            
            .year-filter label {
              margin-right: 8px !important;
            }
          }
        `}
      </style>
  
      <div 
        className="dashboard-container" 
        style={{ 
          marginLeft: "250px", 
          padding: "20px", 
          fontFamily: "Arial",
          transition: "margin-left 0.3s ease"
        }}
      >
        <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "20px" }}>
          {/*📘📘 Cartes statistiques */}
          <div className="row">
            {[
              { title: "TOTAL DES ACHATS", icon:"fas fa-shopping-cart", amount: totalAchats, bg: "#66c2a5"},
              { title: "TOTAL DES VENTES", icon:"fas fa-cash-register", amount: totalVentes, bg: "#fc8d62"},
              { title: "TOTAL DES FOURNISSEURS", icon:"fas fa-truck", amount: totalFournisseurs, bg: "#8da0cb" },
              { title: "TOTAL DES CLIENTS", icon:"fas fa-user", amount: totalClients, bg: "#e78ac3" }
            ].map((card, index) => (
              <div key={index} className="col-6 col-md-3 mb-3">
                <div 
                  className="stats-card mx-0 py-1 px-1 shadow" 
                  style={{
                    color: "gray",
                    backgroundColor: "white", 
                    borderRadius: "10px",
                    height: "100%"
                  }}
                >
                  <div className="card-body text-center">
                    <p style={{ fontSize: "12px" }}> 
                      <i className={`${card.icon} me-2`}></i> 
                      {card.title}
                    </p>
                    <p>{card.amount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Filtre par année */}
          <div 
            className="year-filter shadow" 
            style={{ 
              color: "white", 
              textAlign: "center", 
              backgroundColor: "rgb(74,138,126)", 
              padding: "4px",
              borderRadius: "5px" 
            }}
          >
            <label>Filtrer par année : </label>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              style={{ borderRadius: "3px", padding: "2px" }}
            >
              {[...Array(5)].map((_, i) => {
                const an = new Date().getFullYear() - i;
                return <option key={an} value={an}>{an}</option>;
              })}
            </select>
          </div>
  
          {/* 📘📘Graphique des ventes et camembert des catégories */}
          <div className="container-fluid mt-4 px-0">
            <div className="row">
              <div className="col-12 col-md-8 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title chart-title">Les ventes en {selectedYear} par mois</h5>
                    <div style={{ height: "300px", width: "100%" }}>
                  {/* 📘📘Graphique des ventes  */}

                      <Bar 
                        data={chartDataSales} 
                        options={{
                          maintainAspectRatio: false,
                          responsive: true
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="col-12 col-md-4 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title chart-title">Catégories les plus vendues</h5>
                    <div style={{ height: "300px", width: "100%" }}>
                      <ResponsiveContainer width="100%" height="100%">
                    {/* 📘📘Graphique des catégories  */}

                        <PieChart>
                          <Pie 
                            data={data} 
                            dataKey="ventes" 
                            nameKey="name" 
                            cx="50%" 
                            cy="50%" 
                            outerRadius={90} 
                            fill="#8884d8"
                          >
                            {data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/*📘📘 Clients par ville et graphique ligne des clients */}
          <div className="container-fluid mt-2 px-0">
            <div className="row">
              <div className="col-12 col-md-4 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title chart-title">Nos clients par ville</h5>
                    <div style={{ overflowY: "auto", maxHeight: "350px" }}>
                      {cityData.map((entry, index) => {
                        const percentage = ((entry.total_clients / totalCityClients) * 100).toFixed(1);
                        return (
                          <div key={entry.ville} style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                            <span 
                              className="city-label"
                              style={{ 
                                minWidth: "100px", 
                                fontSize: "16px", 
                                fontWeight: "bold" 
                              }}
                            >
                              <i className="fas fa-city me-2"></i> 
                              {entry.ville}
                            </span>
  
                            <div
                              style={{
                                height: "30px",
                                width: `${percentage}%`,
                                maxWidth: "calc(100% - 110px)",
                                minWidth: "40px",
                                backgroundColor: COLORS_BAR[index % COLORS_BAR.length],
                                borderRadius: "15px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                paddingRight: "10px",
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "13px",
                                padding: "5px",
                                marginLeft: "10px",
                              }}
                            >
                              {percentage}%
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="col-12 col-md-8 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title chart-title">Clients et visiteurs par mois</h5>
                    <div style={{ height: "300px", width: "100%" }}>
                    {/*📘📘 visiteurs */}
                      <Line 
                        data={clientsChartData} 
                        options={{
                          ...clientsOptions,
                          maintainAspectRatio: false,
                          responsive: true
                        }} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;