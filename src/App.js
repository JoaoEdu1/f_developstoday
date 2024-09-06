import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  CountryListPage  from "./pages/CountryListPage.js";
import  CountryInfoPage  from "./pages/CountryInfoPage.js";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryListPage />} />
        <Route path="/country/:countryCode" element={<CountryInfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
