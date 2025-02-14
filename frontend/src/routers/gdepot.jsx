// import { Routes, Route, Link } from "react-router-dom";
// import React from "react";

// import Commandef from "../admin/commandef";  
// import Stock from "../admin/stock";  
// import Produit_cf from "../admin/produit_cf";  
// import Add_commandef from "../admin/add_commandef";  
// import Update_commandef from "../admin/update_commandef";  


// import Home from "../login/home";  

// const Gdepot = () => {
//   return (
//     <div>
//       <style>
//         {`
//           nav {
//             background-color: rgb(175, 76, 101);
//             padding: 10px;
//             display: flex;
//             justify-content: center;
//           }
//           nav ul {
//             list-style-type: none;
//             margin: 0;
//             padding: 0;
//             display: flex;
//             gap: 20px;
//           }
//           nav ul li {
//             display: inline;
//           }
//           nav ul li a {
//             color: white;
//             text-decoration: none;
//             font-weight: bold;
//           }
//           nav ul li a:hover {
//             text-decoration: underline;
//           }
//         `}
//       </style>
//       <nav>
//         <ul>
//           <li><Link to="/gdepot/commandef">Commande Fournisseur</Link></li>
//           <li><Link to="/gdepot/stock">Stock</Link></li>
//           <li><Link to="/home">Log out</Link></li>
//         </ul>
//       </nav>
//       <hr />
//       <Routes>
//         <Route path="/" element={<Stock />} />
//         <Route path="commandef" element={<Commandef />} /> 
//         <Route path="stock" element={<Stock />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="produit_cf/:id" element={<Produit_cf />} />
//         <Route path="add_commandef" element={<Add_commandef />} />
//         <Route path="update_commandef/:id" element={<Update_commandef />} />

 
//       </Routes>
//     </div>
//   );
// };

// export default Gdepot;
