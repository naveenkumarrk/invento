import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inventory from "./components/inventory/Inventory";
import Dashboard from "./components/Dashboard";
import SideNav from "./components/navs/SideNav";
import Content from "./components/Content";

const App = () => {
  return (
    <>
      <div className="flex bg-[#191918]">
        <Router>
          <SideNav />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
