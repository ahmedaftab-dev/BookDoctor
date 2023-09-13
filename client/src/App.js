import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
import { ProtectedRoute } from "./components/routes/protectedRoutes";
import { PublicRoute } from "./components/routes/publicRoutes";
import ApplyDoctor from "./pages/doctor/applyDoctor";
import Notifications from "./pages/notification/notifactions";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
       {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
        <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}/> 
        <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} 
        />
        <Route
          path="/apply-doctor"
          element={
            <ProtectedRoute>
              <ApplyDoctor />
            </ProtectedRoute>
          }
        />
               <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
      </Routes>
  </BrowserRouter>

  );
}

export default App;