import { useState } from "react";
import { ModalEditarResultado } from "./ModalEditarResultado";

export function ChaveamentoMataMata({
  partidas,
  jogadores = [],
  onSalvarResultado,
}) {
  // Guarda o objeto do jogo que abriu no modal (ou null se nenhum)
  const [partidaSelecionada, setPartidaSelecionada] = useState(null);

  // Agrupa os confrontos por Fase
  const fasesAgrupadas = partidas.reduce((acumulador, partida) => {
    const nomeFase = partida.fase || "Eliminatórias";
    if (!acumulador[nomeFase]) acumulador[nomeFase] = [];
    acumulador[nomeFase].push(partida);
    return acumulador;
  }, {});

  const nomesDasFases = Object.keys(fasesAgrupadas);

  // Identifica o campeão se a Final já terminou
  const jogoFinal = partidas.find((p) => p.fase === "Final");
  let nomeCampeao = null;
  if (jogoFinal && jogoFinal.finalizada) {
    nomeCampeao =
      jogoFinal.golsMandante > jogoFinal.golsVisitante
        ? jogoFinal.nomeMandante
        : jogoFinal.nomeVisitante;
  }

  return (
    <div className="flex flex-col">
      {/* Banner de Campeão */}
      {nomeCampeao && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-center gap-3 shadow-xs">
          <span className="text-2xl">🏆</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-yellow-800">
              Grande Campeão
            </p>
            <p className="text-xl font-black text-yellow-950">{nomeCampeao}</p>
          </div>
        </div>
      )}

      {/* Árvore de Fases em Colunas */}
      <div className="flex gap-8 overflow-x-auto p-4">
        {nomesDasFases.map((nomeFase) => (
          <div key={nomeFase} className="flex flex-col min-w-[260px]">
            <h3 className="font-bold text-slate-700 text-center mb-4 pb-2 border-b border-slate-200">
              {nomeFase}
            </h3>

            <div className="flex flex-col gap-4">
              {fasesAgrupadas[nomeFase].map((jogo) => {
                const timesProntos =
                  jogo.idMandante !== null && jogo.idVisitante !== null;

                return (
                  <div
                    key={jogo.id}
                    className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs text-sm"
                  >
                    {/* Mandante */}
                    <div className="flex justify-between items-center py-1">
                      <span
                        className={`truncate ${jogo.vencedorId === jogo.idMandante && jogo.finalizada ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}
                      >
                        {jogo.nomeMandante}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {jogo.finalizada &&
                          jogo.penaltisMandante !== null &&
                          jogo.penaltisMandante !== undefined && (
                            <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                              ({jogo.penaltisMandante})
                            </span>
                          )}
                        <span className="font-bold text-slate-800 w-4 text-right">
                          {jogo.finalizada ? jogo.golsMandante : "-"}
                        </span>
                      </div>
                    </div>

                    {/* Visitante */}
                    <div className="flex justify-between items-center py-1 border-t border-slate-100">
                      <span
                        className={`truncate ${jogo.vencedorId === jogo.idVisitante && jogo.finalizada ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}
                      >
                        {jogo.nomeVisitante}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {jogo.finalizada &&
                          jogo.penaltisVisitante !== null &&
                          jogo.penaltisVisitante !== undefined && (
                            <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                              ({jogo.penaltisVisitante})
                            </span>
                          )}
                        <span className="font-bold text-slate-800 w-4 text-right">
                          {jogo.finalizada ? jogo.golsVisitante : "-"}
                        </span>
                      </div>
                    </div>

                    {/* Autores dos gols resumidos no card */}
                    {jogo.finalizada &&
                      jogo.autoresGols &&
                      jogo.autoresGols.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                          {jogo.autoresGols.map((a, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded flex items-center gap-1"
                            >
                              <span>⚽</span>
                              <span>{a.nomeJogador}</span>
                            </span>
                          ))}
                        </div>
                      )}

                    {/* Botão de Ação */}
                    <div className="mt-2 pt-2 border-t border-slate-100 flex justify-end">
                      <button
                        type="button"
                        disabled={!timesProntos}
                        onClick={() => setPartidaSelecionada(jogo)}
                        className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                          timesProntos
                            ? "text-green-700 bg-green-50 hover:bg-green-100 cursor-pointer"
                            : "text-slate-300 cursor-not-allowed"
                        }`}
                      >
                        {jogo.finalizada ? "Editar Placar" : "Lançar Placar"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Renderização Condicional do Modal */}
      {partidaSelecionada && (
        <ModalEditarResultado
          partida={partidaSelecionada}
          jogadores={jogadores}
          onSalvar={onSalvarResultado}
          onFechar={() => setPartidaSelecionada(null)}
        />
      )}
    </div>
  );
}
