import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Historial from "./pages/Historial";
import Configuracion from "./pages/Configuracion";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/config"    element={<Configuracion />} />
      </Routes>
    </>
  );
}