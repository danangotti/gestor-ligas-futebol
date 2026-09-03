import { Link } from "react-router-dom";
import logoLiggo from "../assets/LogoLiggo.png";

export function HeaderDashbord() {
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
          <Link to="/dashbord" className="text-sm font-medium text-text-secondary hover:text-brand-green transition-colors">
            Painel
          </Link>
          <Link to="/dashbord" className="text-sm font-medium text-text-secondary hover:text-brand-green transition-colors">
            Minhas Ligas
          </Link>
        </nav>

        {/* BLOCO 3: AÇÕES DO USUÁRIO */}
        <div className="flex items-center gap-4">
         
        <span className="text-sm font-medium text-slate-800">Dan Angotti</span>

        <button className="text-xs text-slate-500 hover:text-red-600 transition-colors">Sair</button>
        </div>

      </div>
    </header>
  );
}