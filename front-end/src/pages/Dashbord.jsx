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

  const [listaDeLigas, setListaDeLigas] = useState(ligasIniciais);

  function salvarNovaLiga() {
    if (nomeLiga.trim() === "") {
      alert("Por favor, digite o nome da competição.");
      return;
    }

    // Ao criar, inicializamos com array de partidas vazio
    // para que o status calculado seja "Não iniciada"
    const novaLiga = {
      id: Date.now(),
      nome: nomeLiga,
      quantidadeTimes: Number(qtdTimes),
      formato: formatoLiga,
      partidas: [],
    };

    setListaDeLigas([...listaDeLigas, novaLiga]);
    setNomeLiga("");
    setModalAberto(false);
  }

  // Define as cores com base no status da competição
  function obterEstiloStatus(status) {
    if (status === "Em andamento") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    if (status === "Finalizada") {
      return "bg-slate-100 text-slate-700 border-slate-200";
    }
    // Padrão para "Não iniciada"
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  // Calcula o status da competição dinamicamente a partir das partidas
  function calcularStatusCompeticao(partidas = []) {
    if (partidas.length === 0) {
      return "Não iniciada";
    }

    const todasPartidasFinalizadas = partidas.every(
      (partida) => partida.finalizada,
    );

    if (todasPartidasFinalizadas) {
      return "Finalizada";
    }

    return "Em andamento";
  }

  // ==========================================
  // 2. ÁREA VISUAL (Renderização)
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <HeaderDashbord />

      <div className="p-6 sm:p-8">
        {/* --- CABEÇALHO --- */}
        <header className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-200 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Painel de Controle
            </h1>
            <p className="text-slate-500 text-sm font-normal mt-1">
              Gerencie suas competições, tabelas e partidas em um só lugar.
            </p>
          </div>

          <button
            onClick={() => setModalAberto(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm text-sm"
          >
            + Criar Nova Liga
          </button>
        </header>

        {/* --- CONTEÚDO PRINCIPAL --- */}
        <main className="max-w-6xl mx-auto mt-8">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Minhas Ligas</h2>
          </div>

          {listaDeLigas.length === 0 ? (
            /* Estado Vazio */
            <div className="bg-white border border-slate-200 rounded-xl p-12 mt-6 text-center shadow-sm">
              <p className="text-slate-500 text-sm mb-4">
                Você ainda não tem nenhuma liga cadastrada.
              </p>
              <button
                onClick={() => setModalAberto(true)}
                className="text-green-600 font-medium hover:underline text-sm"
              >
                Criar minha primeira liga
              </button>
            </div>
          ) : (
            /* Grade de Cards */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {listaDeLigas.map((liga) => {
                // Calculamos uma única vez por liga para sincronizar texto e estilo visual
                const statusCalculado = calcularStatusCompeticao(liga.partidas);

                return (
                  <div
                    key={liga.id}
                    className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <h3 className="font-bold text-base text-slate-900">
                        {liga.nome}
                      </h3>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${obterEstiloStatus(
                          statusCalculado,
                        )}`}
                      >
                        {statusCalculado}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-sm text-slate-500 font-normal">
                      <p>
                        <span className="text-slate-900 font-medium">
                          Equipes:
                        </span>{" "}
                        {liga.quantidadeTimes} times
                      </p>
                      <p>
                        <span className="text-slate-900 font-medium">
                          Formato:
                        </span>{" "}
                        {liga.formato}
                      </p>
                    </div>

                    {/* Rodapé do Card: Link navegável */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
                      <Link
                        to={`/liga/${liga.id}`}
                        className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
                      >
                        Gerenciar Liga &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

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
