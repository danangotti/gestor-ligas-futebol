import { useState } from "react";

export default function ModalCriarLiga({
  modalAberto,
  setModalAberto,
  nomeLiga,
  setNomeLiga,
  qtdTimes,
  setQtdTimes,
  formatoLiga,
  setFormatoLiga,
  salvarNovaLiga,
}) {
  // Controle de navegação do Wizard
  const [etapaAtual, setEtapaAtual] = useState(1);

  // Estados: Pontos Corridos
  const [tipoTurno, setTipoTurno] = useState("Turno Único");

  // Estados: Fase de Grupos + Mata-Mata
  const [qtdGrupos, setQtdGrupos] = useState(4);
  const [timesPorGrupo, setTimesPorGrupo] = useState(4);
  const [classificadosPorGrupo, setClassificadosPorGrupo] = useState(2);
  const [turnoGrupos, setTurnoGrupos] = useState("Turno Único");

  // Estados: Mata-Mata Puro
  const [qtdTimesMataMata, setQtdTimesMataMata] = useState(8);
  const [tipoConfrontoMataMata, setTipoConfrontoMataMata] =
    useState("Jogo Único");

  // Estados: Pontos Corridos + Mata-Mata
  const [qtdTimesPontosMataMata, setQtdTimesPontosMataMata] = useState(8);
  const [qtdClassificadosPontosMataMata, setQtdClassificadosPontosMataMata] =
    useState(4);
  const [turnoPontosMataMata, setTurnoPontosMataMata] = useState("Turno Único");

  // Métricas derivadas
  const totalTimesGrupos = Number(qtdGrupos) * Number(timesPorGrupo);
  const totalClassificadosMataMata =
    Number(qtdGrupos) * Number(classificadosPorGrupo);

  const formatosDisponiveis = [
    "Pontos Corridos",
    "Fase de Grupos + Mata-Mata",
    "Mata-Mata",
    "Pontos Corridos + Mata-Mata",
  ];

  const mapeamentoFases = {
    2: "Final",
    4: "Semifinal",
    8: "Quartas de final",
    16: "Oitavas de final",
    32: "16 avos de final",
  };

  const faseInicial = mapeamentoFases[qtdTimesMataMata];
  const faseInicialMisto = mapeamentoFases[qtdClassificadosPontosMataMata];

  function fecharModal() {
    setEtapaAtual(1);
    setModalAberto(false);
  }

  function avancarPasso() {
    if (nomeLiga.trim() === "") {
      alert("Por favor, digite o nome da competição.");
      return;
    }
    setEtapaAtual(2);
  }

  if (!modalAberto) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-6 shadow-xl">
        {/* TOPO */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Nova Competição
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              Etapa {etapaAtual} de 2
            </span>
          </div>
          <button
            onClick={fecharModal}
            className="text-slate-400 hover:text-slate-600 text-sm font-medium"
          >
            ✕
          </button>
        </div>

        {/* CORPO */}
        <div className="py-6">
          {/* ETAPA 1 */}
          {etapaAtual === 1 && (
            <div className="space-y-4">
              <label className="block text-xs font-medium text-slate-700">
                Nome da Competição
                <input
                  type="text"
                  placeholder="Ex: Copa Libertadores Amadora"
                  value={nomeLiga}
                  onChange={(e) => setNomeLiga(e.target.value)}
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-green-600"
                />
              </label>

              <div>
                <span className="block text-xs font-medium text-slate-700 mb-2">
                  Formato da Competição
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {formatosDisponiveis.map((formato) => (
                    <button
                      key={formato}
                      type="button"
                      onClick={() => setFormatoLiga(formato)}
                      className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-medium border transition-all text-center ${
                        formatoLiga === formato
                          ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {formato}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ETAPA 2 */}
          {etapaAtual === 2 && (
            <div>
              <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-xs text-slate-500 font-medium">
                  Formato selecionado:
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {formatoLiga}
                </p>
              </div>

              {/* 1. PONTOS CORRIDOS */}
              {formatoLiga === "Pontos Corridos" && (
                <div className="space-y-4">
                  <label className="block text-xs font-medium text-slate-700">
                    Quantidade de Equipes
                    <select
                      value={qtdTimes}
                      onChange={(e) => setQtdTimes(Number(e.target.value))}
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:border-green-600"
                    >
                      {[4, 6, 8, 10, 12, 14, 16, 18, 20].map((numero) => (
                        <option key={numero} value={numero}>
                          {numero} equipes
                        </option>
                      ))}
                    </select>
                  </label>

                  <div>
                    <span className="block text-xs font-medium text-slate-700 mb-2">
                      Tipo de Turno
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setTipoTurno("Turno Único")}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium border transition-all text-center ${
                          tipoTurno === "Turno Único"
                            ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        Turno Único
                      </button>

                      <button
                        type="button"
                        onClick={() => setTipoTurno("Turno e Returno")}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium border transition-all text-center ${
                          tipoTurno === "Turno e Returno"
                            ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        Turno e Returno
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. FASE DE GRUPOS + MATA-MATA */}
              {formatoLiga === "Fase de Grupos + Mata-Mata" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <label className="block text-xs font-medium text-slate-700">
                      Nº de Grupos
                      <select
                        value={qtdGrupos}
                        onChange={(e) => setQtdGrupos(Number(e.target.value))}
                        className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:border-green-600"
                      >
                        <option value={2}>2 grupos</option>
                        <option value={4}>4 grupos</option>
                        <option value={8}>8 grupos</option>
                      </select>
                    </label>

                    <label className="block text-xs font-medium text-slate-700">
                      Times p/ Grupo
                      <select
                        value={timesPorGrupo}
                        onChange={(e) =>
                          setTimesPorGrupo(Number(e.target.value))
                        }
                        className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:border-green-600"
                      >
                        <option value={3}>3 times</option>
                        <option value={4}>4 times</option>
                        <option value={5}>5 times</option>
                        <option value={6}>6 times</option>
                      </select>
                    </label>

                    <label className="block text-xs font-medium text-slate-700">
                      Vagas p/ Mata-Mata
                      <select
                        value={classificadosPorGrupo}
                        onChange={(e) =>
                          setClassificadosPorGrupo(Number(e.target.value))
                        }
                        className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:border-green-600"
                      >
                        <option value={1}>1 por grupo</option>
                        <option value={2}>2 por grupo</option>
                      </select>
                    </label>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-around text-center">
                    <div>
                      <p className="text-xs text-slate-400 font-medium">
                        Total de Equipes
                      </p>
                      <p className="text-base font-bold text-slate-900">
                        {totalTimesGrupos}
                      </p>
                    </div>
                    <div className="border-r border-slate-200" />
                    <div>
                      <p className="text-xs text-slate-400 font-medium">
                        Avançam ao Mata-Mata
                      </p>
                      <p className="text-base font-bold text-green-700">
                        {totalClassificadosMataMata} times
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-medium text-slate-700 mb-2">
                      Jogos na Fase de Grupos
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setTurnoGrupos("Turno Único")}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium border transition-all text-center ${
                          turnoGrupos === "Turno Único"
                            ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        Turno Único
                      </button>

                      <button
                        type="button"
                        onClick={() => setTurnoGrupos("Turno e Returno")}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium border transition-all text-center ${
                          turnoGrupos === "Turno e Returno"
                            ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        Turno e Returno
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. MATA-MATA */}
              {formatoLiga === "Mata-Mata" && (
                <div className="space-y-4">
                  <label className="block text-xs font-medium text-slate-700">
                    Quantidade de Equipes
                    <select
                      value={qtdTimesMataMata}
                      onChange={(e) =>
                        setQtdTimesMataMata(Number(e.target.value))
                      }
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:border-green-600"
                    >
                      {[4, 8, 16, 32].map((numero) => (
                        <option key={numero} value={numero}>
                          {numero} equipes
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                    <p className="text-xs text-slate-400 font-medium">
                      Fase Inicial
                    </p>
                    <p className="text-base font-bold text-green-700">
                      {faseInicial}
                    </p>
                  </div>

                  <div>
                    <span className="block text-xs font-medium text-slate-700 mb-2">
                      Formato dos Confrontos
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setTipoConfrontoMataMata("Jogo Único")}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium border transition-all text-center ${
                          tipoConfrontoMataMata === "Jogo Único"
                            ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        Jogo Único
                      </button>

                      <button
                        type="button"
                        onClick={() => setTipoConfrontoMataMata("Ida e Volta")}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium border transition-all text-center ${
                          tipoConfrontoMataMata === "Ida e Volta"
                            ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        Ida e Volta
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. PONTOS CORRIDOS + MATA-MATA */}
              {formatoLiga === "Pontos Corridos + Mata-Mata" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block text-xs font-medium text-slate-700">
                      Total de Equipes
                      <select
                        value={qtdTimesPontosMataMata}
                        onChange={(e) =>
                          setQtdTimesPontosMataMata(Number(e.target.value))
                        }
                        className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:border-green-600"
                      >
                        {[6, 8, 10, 12, 16, 20].map((numero) => (
                          <option key={numero} value={numero}>
                            {numero} equipes
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block text-xs font-medium text-slate-700">
                      Vagas p/ Mata-Mata
                      <select
                        value={qtdClassificadosPontosMataMata}
                        onChange={(e) =>
                          setQtdClassificadosPontosMataMata(
                            Number(e.target.value),
                          )
                        }
                        className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:border-green-600"
                      >
                        <option value={2}>Top 2 (Final direta)</option>
                        <option value={4}>Top 4 (Semifinal)</option>
                        {qtdTimesPontosMataMata >= 10 && (
                          <option value={8}>Top 8 (Quartas)</option>
                        )}
                      </select>
                    </label>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                    <p className="text-xs text-slate-400 font-medium">
                      O Mata-Mata começará na:
                    </p>
                    <p className="text-base font-bold text-green-700">
                      {faseInicialMisto}
                    </p>
                  </div>

                  <div>
                    <span className="block text-xs font-medium text-slate-700 mb-2">
                      Fase de Pontos Corridos
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setTurnoPontosMataMata("Turno Único")}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium border transition-all text-center ${
                          turnoPontosMataMata === "Turno Único"
                            ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        Turno Único
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setTurnoPontosMataMata("Turno e Returno")
                        }
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium border transition-all text-center ${
                          turnoPontosMataMata === "Turno e Returno"
                            ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        Turno e Returno
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RODAPÉ */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          {etapaAtual === 1 ? (
            <>
              <button
                type="button"
                onClick={fecharModal}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={avancarPasso}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-xl transition-colors shadow-sm"
              >
                Avançar &rarr;
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setEtapaAtual(1)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                &larr; Voltar
              </button>
              <button
                type="button"
                onClick={salvarNovaLiga}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-xl transition-colors shadow-sm"
              >
                Salvar Liga
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
