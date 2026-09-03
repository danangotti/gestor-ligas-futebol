import { useParams, Link } from "react-router-dom";
import { HeaderDashbord } from "../components/HeaderDashbord"; // ajuste o caminho se necessário

export default function PaginaGerenciarLiga() {
  // O useParams captura o valor que está no :id da URL
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Mantemos a Navbar no topo para manter a consistência visual */}
      <HeaderDashbord />

      <div className="max-w-6xl mx-auto p-6 sm:p-8">
        
        {/* Link para voltar ao painel */}
        <Link 
          to="/dashbord" 
          className="text-sm font-medium text-slate-500 hover:text-green-600 transition-colors inline-block mb-4"
        >
          ← Voltar para Minhas Ligas
        </Link>

        {/* Cabeçalho da Liga */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
          <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-md">
            ID da Liga: {id}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            Painel de Gestão da Competição
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Aqui você irá gerenciar tabela de classificação, times participantes e chaveamento de jogos.
          </p>
        </div>

      </div>
    </div>
  );
}