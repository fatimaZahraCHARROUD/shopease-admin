import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Box, Grid, Card, Typography, Button } from "@mui/material";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement // Register ArcElement for Pie chart
);

const Dashboard = () => {
  // Example data for charts and stats
  const revenueData = {
    labels: ["24 Hours", "Last Week", "Last Month"],
    datasets: [
      {
        label: "Revenue",
        data: [24165, 18400, 22000],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const skuSalesData = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        label: "Electronics",
        data: [15, 20, 25, 30, 20, 18, 35, 40, 36, 29, 31, 27],
        borderColor: "red",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
      },
      {
        label: "Health",
        data: [12, 17, 19, 23, 20, 21, 28, 33, 30, 32, 26, 25],
        borderColor: "blue",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 1,
      },
      {
        label: "Pet Supplies",
        data: [10, 15, 20, 18, 16, 15, 22, 24, 28, 30, 35, 38],
        borderColor: "green",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 1,
      },
    ],
  };

  const categorySalesData = {
    labels: ["Pet Supplies", "Electronics", "Health", "Tablets", "Apparel"],
    datasets: [
      {
        data: [10, 25, 15, 20, 30],
        backgroundColor: ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99", "#c2c2f0"],
        hoverOffset: 4,
      },
    ],
  };

  return (<div style={{ marginLeft:"270px",}}>
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h5">${revenueData.datasets[0].data[0]}</Typography>
            <Typography variant="body2">24 Hours</Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h5">432,168</Typography>
            <Typography variant="body2">24 Hours</Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Social Media</Typography>
            <Typography variant="body1">Facebook: 5.6K</Typography>
            <Typography variant="body1">Instagram: 3.4K</Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Category Wise Breakup</Typography>
            <Pie data={categorySalesData} />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">SKU Sales by Month</Typography>
            <Bar data={skuSalesData} />
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Orders by Status</Typography>
            <Button variant="contained">View Orders</Button>
          </Card>
        </Grid>
      </Grid>
    </Box></div>
  );
};

export default Dashboard;
