import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login";
import Data from "./components/Data";



export const config = {
  endpoint: `http://localhost:3000`,
};


function App() {
  const [userName, setUserName] = useState(""); // Manage userName state

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setUserName={setUserName} />} />
        <Route path="/TaskPage" element={<Data userName={userName} />} />
      </Routes>
    </Router>
  );
}

export default App;
