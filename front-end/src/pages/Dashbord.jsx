import { useState } from "react";
import { Link } from "react-router-dom";
import ModalCriarLiga from "../components/ModalCriarLiga";
import { HeaderDashbord } from "../components/HeaderDashbord";
import { ligasIniciais } from "../dados/dadosIniciais";

export default function PaginaDashbord() {
  // ==========================================
  // 1. ÁREA LÓGICA (Estados e Funções Auxiliares)
  // ==========================================
  const [nomeLiga, setNomeLiga] = useState("");
  const [qtdTimes, setQtdTimes] = useState("8");
  const [formatoLiga, setFormatoLiga] = useState("Pontos corridos");
  const [modalAberto, setModalAberto] = useState(false);

  const [listaDeLigas, setListaDeLigas] = useState(() => {
    const salvas = localStorage.getItem("ligas_cadastradas");
    return salvas ? JSON.parse(salvas) : ligasIniciais;
  });

  function salvarNovaLiga(dadosDaLiga) {
    const novaLiga = {
      id: Date.now(),
      nome: dadosDaLiga.nome,
      formato: dadosDaLiga.formato,
      configuracao: dadosDaLiga.configuracao,
      quantidadeTimes: dadosDaLiga.configuracao.totalEquipes,
      partidas: [],
    };

    const listaAtualizada = [...listaDeLigas, novaLiga];
    setListaDeLigas(listaAtualizada);
    localStorage.setItem("ligas_cadastradas", JSON.stringify(listaAtualizada));

    setNomeLiga("");
    setModalAberto(false);
  }

  // Estilos avançados para os status com badges modernas e pontos luminosos
  function renderBadgeStatus(status) {
    if (status === "Em andamento") {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/70 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Em andamento
        </span>
      );
    }
    if (status === "Finalizada") {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-bold bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          Finalizada
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-bold bg-amber-50 text-amber-700 border border-amber-200/70 shadow-2xs">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        Não iniciada
      </span>
    );
  }

  function calcularStatusCompeticao(partidas = []) {
    if (partidas.length === 0) return "Não iniciada";
    const todasPartidasFinalizadas = partidas.every(
      (partida) => partida.finalizada,
    );
    return todasPartidasFinalizadas ? "Finalizada" : "Em andamento";
  }

  // Métricas rápidas calculadas para o cabeçalho
  const totalLigas = listaDeLigas.length;
  const ligasAtivas = listaDeLigas.filter(
    (l) => calcularStatusCompeticao(l.partidas) === "Em andamento",
  ).length;
  const ligasFinalizadas = listaDeLigas.filter(
    (l) => calcularStatusCompeticao(l.partidas) === "Finalizada",
  ).length;

  // ==========================================
  // 2. ÁREA VISUAL (Renderização)
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 pb-20 selection:bg-green-500 selection:text-white">
      <HeaderDashbord />

      <main className="max-w-6xl mx-auto p-4 sm:p-8">
        {/* --- BANNER PRINCIPAL COM AMBIENT GLOW --- */}
        <div className="relative overflow-hidden bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs mb-10">
          {/* Efeitos de luz sutil no fundo */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-400/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200/60 text-green-700 text-xs font-bold uppercase tracking-wider mb-3">
                <span>⚡</span> Painel do Organizador
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Painel de Controle
              </h1>
              <p className="text-slate-500 text-sm sm:text-base font-normal mt-2 max-w-xl">
                Crie campeonatos, monte tabelas inteligentes e acompanhe cada
                gol em tempo real.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setModalAberto(true)}
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-green-600/20 active:scale-95 transition-all duration-200 text-sm cursor-pointer"
            >
              <span className="text-lg leading-none transition-transform duration-200 group-hover:rotate-90">
                +
              </span>
              <span>Criar Nova Liga</span>
            </button>
          </div>

          {/* Mini-Cards de Estatísticas do Painel */}
          <div className="relative z-10 grid grid-cols-3 gap-3 sm:gap-4 mt-8 pt-8 border-t border-slate-100">
            <div className="bg-slate-50/70 border border-slate-200/60 rounded-2xl p-3 sm:p-4 text-center sm:text-left">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Total de Ligas
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5">
                {totalLigas}
              </p>
            </div>

            <div className="bg-slate-50/70 border border-slate-200/60 rounded-2xl p-3 sm:p-4 text-center sm:text-left">
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
                Em Andamento
              </span>
              <p className="text-xl sm:text-2xl font-black text-emerald-700 mt-0.5">
                {ligasAtivas}
              </p>
            </div>

            <div className="bg-slate-50/70 border border-slate-200/60 rounded-2xl p-3 sm:p-4 text-center sm:text-left">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Concluídas
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-600 mt-0.5">
                {ligasFinalizadas}
              </p>
            </div>
          </div>
        </div>

        {/* --- CABEÇALHO DA LISTAGEM --- */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-6 bg-green-600 rounded-full" />
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              Minhas Competições
            </h2>
            <span className="text-xs font-bold text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded-full">
              {listaDeLigas.length}
            </span>
          </div>
        </div>

        {/* --- ESTADO VAZIO (EMPTY STATE) --- */}
        {listaDeLigas.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-12 text-center shadow-xs">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center text-3xl">
              🏆
            </div>
            <h3 className="text-base font-extrabold text-slate-800">
              Nenhuma liga encontrada
            </h3>
            <p className="text-slate-400 text-sm mt-1 mb-6 max-w-sm mx-auto">
              Comece agora organizando sua primeira competição de pontos
              corridos ou mata-mata.
            </p>
            <button
              type="button"
              onClick={() => setModalAberto(true)}
              className="inline-flex items-center gap-2 text-sm font-bold text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              + Criar minha primeira liga
            </button>
          </div>
        ) : (
          /* --- GRADE DE CARDS (MODERNA & INTERATIVA) --- */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listaDeLigas.map((liga) => {
              const statusCalculado = calcularStatusCompeticao(liga.partidas);
              const isMataMata = liga.formato === "Mata-Mata";

              return (
                <div
                  key={liga.id}
                  className="group relative bg-white border border-slate-200/90 hover:border-green-500/40 rounded-3xl p-6 shadow-xs hover:shadow-xl hover:shadow-green-600/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Linha de Destaque Superior Colorida */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 transition-all ${
                      isMataMata
                        ? "bg-gradient-to-r from-amber-400 to-orange-500"
                        : "bg-gradient-to-r from-green-500 to-emerald-600"
                    }`}
                  />

                  {/* Topo do Card */}
                  <div>
                    <div className="flex justify-between items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg shadow-2xs group-hover:scale-110 transition-transform">
                        {isMataMata ? "⚔️" : "🏆"}
                      </div>
                      {renderBadgeStatus(statusCalculado)}
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-green-700 transition-colors tracking-tight line-clamp-1">
                      {liga.nome}
                    </h3>
                    <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                      ID #{liga.id}
                    </p>

                    {/* Tags com Detalhes da Liga */}
                    <div className="grid grid-cols-2 gap-2 mt-5">
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Clubes
                        </span>
                        <p className="text-xs font-black text-slate-800 mt-0.5 flex items-center gap-1">
                          <span>🛡️</span> {liga.quantidadeTimes} equipes
                        </p>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Formato
                        </span>
                        <p className="text-xs font-black text-slate-800 mt-0.5 flex items-center gap-1">
                          <span>📊</span> {liga.formato}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Rodapé do Card com Ação */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400">
                      {liga.partidas
                        ? `${liga.partidas.length} jogos`
                        : "0 jogos"}
                    </span>

                    <Link
                      to={`/liga/${liga.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-green-700 group-hover:text-green-800 bg-green-50 group-hover:bg-green-100/80 px-3.5 py-2 rounded-xl transition-all"
                    >
                      <span>Gerenciar</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Modal de Criação */}
      <ModalCriarLiga
        modalAberto={modalAberto}
        setModalAberto={setModalAberto}
        nomeLiga={nomeLiga}
        setNomeLiga={setNomeLiga}
        qtdTimes={qtdTimes}
        setQtdTimes={setQtdTimes}
        formatoLiga={formatoLiga}
        setFormatoLiga={setFormatoLiga}
        salvarNovaLiga={salvarNovaLiga}
      />
    </div>
  );
}
