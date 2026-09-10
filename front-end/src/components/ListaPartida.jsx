import { useState } from "react";

export function ListaPartida({ partidas, onSalvarResultado }) {
  // Guarda o id da partida que está aberta em modo de edição (ou null se nenhuma)
  const [idPartidaEmEdicao, setIdPartidaEmEdicao] = useState(null);

  // Estados controlados para capturar o que o usuário digita nos inputs
  const [golsMandanteInput, setGolsMandanteInput] = useState("");
  const [golsVisitanteInput, setGolsVisitanteInput] = useState("");

  // Estado vazio: renderiza aviso caso não existam jogos gerados
  if (!partidas || partidas.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
        <p className="text-slate-700 font-semibold text-base">
          Nenhuma partida gerada ainda
        </p>
        <p className="text-slate-400 text-sm mt-1">
          Complete a quantidade de clubes cadastrados e clique no botão &quot;Gerar Tabela de Jogos&quot;.
        </p>
      </div>
    );
  }

  // Função auxiliar disparada ao clicar em Salvar
  function handleSalvar(idPartida) {
    // Validação simples: impede salvar se algum campo estiver em branco
    if (golsMandanteInput === "" || golsVisitanteInput === "") {
      alert("Por favor, preencha o placar dos dois times.");
      return;
    }

    // 1. Envia os dados para a função do componente pai
    onSalvarResultado(idPartida, golsMandanteInput, golsVisitanteInput);

    // 2. Fecha o modo de edição e limpa os campos
    setIdPartidaEmEdicao(null);
    setGolsMandanteInput("");
    setGolsVisitanteInput("");
  }

  // Função para abrir o modo de edição e carregar os dados se a partida já tiver gols
  function handleIniciarEdicao(partida) {
    setIdPartidaEmEdicao(partida.id);
    setGolsMandanteInput(partida.finalizada ? String(partida.golsMandante) : "");
    setGolsVisitanteInput(partida.finalizada ? String(partida.golsVisitante) : "");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {partidas.map((partida) => {
        // Variável auxiliar para checar se este card específico está em edição
        const estaEmEdicao = partida.id === idPartidaEmEdicao;

        return (
          <div
            key={partida.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors"
          >
            {/* Topo do Card: Número do jogo e badge de status */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 text-xs font-semibold">
              <span className="text-slate-500 uppercase tracking-wider">
                Jogo #{partida.id}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full ${
                  partida.finalizada
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                {partida.finalizada ? "Encerrado" : "Aguardando"}
              </span>
            </div>

            {/* Centro do Card: Confronto */}
            <div className="flex items-center justify-between gap-3 my-2">
              <span className="flex-1 text-right font-bold text-slate-800 text-sm sm:text-base truncate">
                {partida.nomeMandante}
              </span>

              {/* BLOCO CONDICIONAL DO PLACAR: Edição vs Visualização */}
              {estaEmEdicao ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="0"
                      value={golsMandanteInput}
                      disabled={partida.finalizada}
                      onChange={(e) => setGolsMandanteInput(e.target.value)}
                      className="w-12 h-9 text-center font-bold border border-slate-300 rounded-lg focus:outline-none focus:border-green-600 bg-slate-50 text-sm"
                      placeholder="0"
                    />
                    <span className="text-slate-400 font-bold text-xs">x</span>
                    <input
                      type="number"
                      min="0"
                      value={golsVisitanteInput}
                      disabled={partida.finalizada}
                      onChange={(e) => setGolsVisitanteInput(e.target.value)}
                      className="w-12 h-9 text-center font-bold border border-slate-300 rounded-lg focus:outline-none focus:border-green-600 bg-slate-50 text-sm"
                      placeholder="0"
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleSalvar(partida.id)}
                      disabled={partida.finalizada}
                      className="text-xs bg-green-600 hover:bg-green-700 text-white font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      onClick={() => setIdPartidaEmEdicao(null)}
                      className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl text-slate-900 font-bold min-w-[72px] text-base sm:text-lg border border-slate-200">
                  <span>{partida.finalizada ? partida.golsMandante : "-"}</span>
                  <span className="text-slate-400 font-normal text-xs">x</span>
                  <span>{partida.finalizada ? partida.golsVisitante : "-"}</span>
                </div>
              )}

              <span className="flex-1 text-left font-bold text-slate-800 text-sm sm:text-base truncate">
                {partida.nomeVisitante}
              </span>
            </div>

            {/* Rodapé do Card: Botão exibido apenas em modo visualização e se o jogo não foi finalizado */}
            {!estaEmEdicao && !partida.finalizada && (
              <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
                <button
                type="button"
                onClick={() => handleIniciarEdicao(partida)}
                className="text-xs font-semibold text-green-700 hover:text-green-800 hover:bg-green-50 px-3 py-1.5 rounded-lg border border-green-200 transition-colors cursor-pointer"
                 >
                  Lançar Placar
                  </button>
                  </div>
                )}
          </div>
        );
      })}
    </div>
  );
}