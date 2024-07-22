import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import Contacto from "./pages/FormularioContacto";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <WhatsAppButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactos" element={<Contacto />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
