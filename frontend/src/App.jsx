import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import Signin from "./login/signin";
import Home from "./login/home";
import Admin from "./routers/admin";
 
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin/*" element={<Admin />} />
       </Routes>
    </BrowserRouter>
  );
};

export default App;
