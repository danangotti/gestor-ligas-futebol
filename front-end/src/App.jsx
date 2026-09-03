import { BrowserRouter, Routes, Route } from "react-router-dom";
import  LandingPage  from "./pages/LandingPage";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro"
import PaginaDashbord from "./pages/Dashbord";
import PaginaGerenciarLiga from "./pages/PaginaGerenciarLiga";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* O path é o nome da URL da pagina, e o / significa a raiz (Pagina inicial), por isso nesse caso é so o / */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashbord" element={<PaginaDashbord />} />
        {/* ROTA DINÂMICA: o :id varia de acordo com a liga clicada (o : significa q o id não é fixo) */}
        <Route path="/liga/:id" element={<PaginaGerenciarLiga />} />
      </Routes>
    </BrowserRouter>
  );
}