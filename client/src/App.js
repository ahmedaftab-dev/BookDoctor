import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "./components/routes/protectedRoutes";
import { PublicRoute } from "./components/routes/publicRoutes";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
       {loading && (
        <div className="spinner-parent">
          <div class="spinner-border" role="status"></div>
        </div>
      )}
        <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}/> 
        <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} /> 
      </Routes>
  </BrowserRouter>

  );
}

export default App;