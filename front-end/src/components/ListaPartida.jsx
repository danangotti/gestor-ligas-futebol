export function ListaPartida({ partidas }) {
  
  // 1. Estado Vazio: Renderizado caso as partidas ainda não tenham sido geradas
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

  // 2. Grid de Cards: Exibe as partidas lado a lado no desktop e empilhadas no mobile
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {partidas.map((partida) => (
        <div
          key={partida.id}
          className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors"
        >
          {/* Topo do Card: Número do confronto e badge de status */}
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

          {/* Centro do Card: Confronto estilo placar de transmissão */}
          <div className="flex items-center justify-between gap-3 my-2">
            {/* Clube Mandante (alinhado à direita) */}
            <span className="flex-1 text-right font-bold text-slate-800 text-sm sm:text-base truncate">
              {partida.nomeMandante}
            </span>

            {/* Placar Centralizado */}
            <div className="flex items-center justify-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl text-slate-900 font-bold min-w-[72px] text-base sm:text-lg border border-slate-200">
              <span>{partida.finalizada ? partida.golsMandante : "-"}</span>
              <span className="text-slate-400 font-normal text-xs">x</span>
              <span>{partida.finalizada ? partida.golsVisitante : "-"}</span>
            </div>

            {/* Clube Visitante (alinhado à esquerda) */}
            <span className="flex-1 text-left font-bold text-slate-800 text-sm sm:text-base truncate">
              {partida.nomeVisitante}
            </span>
          </div>

          {/* Rodapé do Card: Ação de lançamento de resultado */}
          <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              className="text-xs font-semibold text-green-700 hover:text-green-800 hover:bg-green-50 px-3 py-1.5 rounded-lg border border-green-200 transition-colors cursor-pointer"
            >
              Lançar Placar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}