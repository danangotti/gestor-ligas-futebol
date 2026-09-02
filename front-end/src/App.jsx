import { BrowserRouter, Routes, Route } from "react-router-dom";
import  LandingPage  from "./pages/LandingPage";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* O path é o nome da URL da pagina, e o / significa a raiz (Pagina inicial), por isso nesse caso é so o / */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}