import { Link, useNavigate } from "react-router-dom";
import logoLiggo from "../assets/LogoLiggo.png";

export function HeaderDashbord() {
    const navegar = useNavigate();

    function fazerLogout(){
        //limpar local storage
       localStorage.removeItem("nomeUsuario");
       localStorage.removeItem("idUsuario");
       navegar("/"); 
    }

    const nomeUsuario = localStorage.getItem("nomeUsuario");
    const idUsuario = localStorage.getItem("idUsuario");

  return (
    <header className="w-full bg-white border-b border-border-main py-4 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/dashbord">
            <img src={logoLiggo} alt="Logo Liggo" className="h-9 w-auto" />
          </Link>
        </div>

        {/* BLOCO 2: MENU DE NAVEGAÇÃO */}
        <nav className="flex items-center gap-8">
          <Link
            to="/dashbord"
            className="text-sm font-medium text-text-secondary hover:text-brand-green transition-colors"
          >
            Painel
          </Link>
          <Link
            to="/dashbord"
            className="text-sm font-medium text-text-secondary hover:text-brand-green transition-colors"
          >
            Minhas Ligas
          </Link>
        </nav>

        {/* BLOCO 3: AÇÕES DO USUÁRIO */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-800">
            Olá, {nomeUsuario ? nomeUsuario : "Visitante"}!
          </span>

          <button
            onClick={fazerLogout}
            className="text-xs text-slate-500 hover:text-red-600 transition-colors"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}