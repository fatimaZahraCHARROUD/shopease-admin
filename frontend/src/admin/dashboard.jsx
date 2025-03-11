import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend as ChartLegend } from "chart.js";
import {  useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, ChartTooltip, ChartLegend);

const COLORS = ["rgb(126, 176, 170)",  "rgb(166, 202, 197)",   "rgb(206, 228, 224)",   "rgb(226, 240, 237)",   "rgb(239, 250, 248)"    ]
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

  // Data for sales chart
  const chartDataSales = {
  
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
    datasets: [{
      label: "Ventes en (DH)",
      data: salesData,
      backgroundColor: "rgb(206,228,224)",
    }]
  };

  // Data for clients chart
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

  // Calculating the total clients for city distribution chart
  const totalCityClients = cityData.reduce((sum, item) => sum + item.total_clients, 0);

  return (
     <div style={{  backgroundColor: "#f8f9fa", minHeight: "100vh",  }}>
      <div style={{ marginLeft: "250px", padding: "20px", fontFamily: "Arial" }}>

        <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "20px" }}>
          

        <div className="row  ">
            {[{ title: "TOTAL DES ACHATS", icon:"fas fa-shopping-cart" , amount: totalAchats,   bg: "#66c2a5"},
            { title: "TOTAL DES VENTES", icon:"fas fa-cash-register" , amount: totalVentes,   bg: "#fc8d62"},
            { title: "TOTAL DES FOURNISSEURS", icon:"fas fa-truck" , amount: totalFournisseurs,  bg: "#8da0cb" },
            { title: "TOTAL DES CLIENTS", icon:"fas fa-user" , amount: totalClients,   bg: "#e78ac3" }]
              .map((card, index) => (
                <div key={index} className="col mb-3">
                  <div className="  mx-0 py-1 px-1 shadow" style={{color:"gray " ,  backgroundColor: "white", borderRadius: "10px" }}>
                    <div   className="card-body text-center">
                      <p style={{ fontSize:"12px"}}> <i   className={`${card.icon} me-2`}></i> {card.title}</p>
                      <p>{card.amount}</p>
                    </div>
                   </div>
                </div>
              ))}
          </div>


          <div  clasName="shadow" style={{ color:" white" ,  textAlign: "center" , backgroundColor:"rgb(74,138,126)", padding:"4px" }}>
            <label >Filtrer par année : </label>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              {[...Array(5)].map((_, i) => {
                const an = new Date().getFullYear() - i;
                return <option key={an} value={an}>{an}</option>;
              })}
            </select>
          </div>

      




<div class="container mt-4">
  <div class="row">
 
     <div class="col-md-8">
      <div class="card shadow-sm">
        <div class="card-body">
        <h5 class="card-title">Les ventes en {selectedYear} par mois</h5>

          <Bar data={chartDataSales} />

          
              </div>
      </div>
    </div>


     <div class="col-md-4">
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title">Catégories les plus vendues</h5>

     <ResponsiveContainer width="100%" height={270}>
      <PieChart>
        <Pie data={data} dataKey="ventes" nameKey="name" cx="50%" cy="50%" outerRadius={90} fill="#8884d8">
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



<div class="container mt-4">
  <div class="row">
 
     <div class="col-md-4">
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title">Notre clients par ville </h5>
          {cityData.map((entry, index) => {
                    const percentage = ((entry.total_clients / totalCityClients) * 100).toFixed(1);
                    return (
                      <div key={entry.ville} style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                       <span style={{ minWidth: "100px", fontSize: "16px", fontWeight: "bold" }}>
                      <i className="fas fa-city me-2"></i> 
                       {entry.ville}
                        </span>

                        <div
                          style={{
                            height: "30px",
                            width: `${percentage}%`,
                            backgroundColor: COLORS_BAR[index % COLORS_BAR.length],
                            borderRadius: "15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            paddingRight: "10px",
                            color: "white",
                            fontWeight: "bold",fontSize:"13px",padding:"5px",marginLeft:"10px",
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

 
     <div class="col-md-8">
      <div class="card shadow-sm">
        <div class="card-body">
           <Line data={clientsChartData} options={clientsOptions} />
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