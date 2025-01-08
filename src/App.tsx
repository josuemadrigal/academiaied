import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { Footer } from "./components/Footer";
import Contacto from "./pages/FormularioContacto";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Rutas con navegación y footer */}
        <Route element={<Layout />}>
          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/contactos" element={<Contacto />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

// Componente de layout para rutas que necesitan Navbar y Footer
const Layout: React.FC = () => (
  <>
    <Navbar />
    <WhatsAppButton />
    <Outlet />
    <Footer />
  </>
);

export default App;
