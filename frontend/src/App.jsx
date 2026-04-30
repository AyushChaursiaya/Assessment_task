import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup.jsx";
import LogIn from "./pages/login.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddItem from "./pages/AddItem.jsx";
import EditItem from "./pages/EditItem.jsx";
import NotFound from "./pages/notFound.jsx";

export const serverUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to={'/'} />} />
        <Route path="/login" element={!isAuthenticated ? <LogIn /> : <Navigate to={'/'} />} />
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to={'/signup'} />} />
        <Route path="/add-item" element={isAuthenticated ? <AddItem /> : <Navigate to="/login" />} />
        <Route path="/edit-item/:itemId" element={isAuthenticated ? <EditItem /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;