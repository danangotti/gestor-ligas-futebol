import { useState } from "react";

export function ListaPartida({ partidas, jogadores = [], onSalvarResultado }) {
  // Guarda o ID da partida que está com o formulário aberto
  const [idPartidaEmEdicao, setIdPartidaEmEdicao] = useState(null);

  // Estados dos campos de gols
  const [golsMandanteInput, setGolsMandanteInput] = useState("");
  const [golsVisitanteInput, setGolsVisitanteInput] = useState("");

  // Arrays com os IDs dos jogadores autores dos gols
  const [autoresMandante, setAutoresMandante] = useState([]);
  const [autoresVisitante, setAutoresVisitante] = useState([]);

  // Estado vazio caso nenhuma partida tenha sido gerada
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

  // Redimensiona a lista de selects de autores conforme a quantidade de gols digitada
  function handleGolsMandanteChange(valor) {
    setGolsMandanteInput(valor);
    const quantidade = Math.max(0, Number(valor) || 0);
    setAutoresMandante((antigos) => {
      const novaLista = [...antigos];
      return Array.from({ length: quantidade }, (_, i) => novaLista[i] || "");
    });
  }

  function handleGolsVisitanteChange(valor) {
    setGolsVisitanteInput(valor);
    const quantidade = Math.max(0, Number(valor) || 0);
    setAutoresVisitante((antigos) => {
      const novaLista = [...antigos];
      return Array.from({ length: quantidade }, (_, i) => novaLista[i] || "");
    });
  }

  function handleAutorMandanteChange(indice, idJogador) {
    setAutoresMandante((antigos) => {
      const atualizados = [...antigos];
      atualizados[indice] = idJogador;
      return atualizados;
    });
  }

  function handleAutorVisitanteChange(indice, idJogador) {
    setAutoresVisitante((antigos) => {
      const atualizados = [...antigos];
      atualizados[indice] = idJogador;
      return atualizados;
    });
  }

  // Prepara o formulário para edição recuperando os dados atuais da partida
  function handleIniciarEdicao(partida) {
    setIdPartidaEmEdicao(partida.id);

    const gM = partida.finalizada ? String(partida.golsMandante) : "";
    const gV = partida.finalizada ? String(partida.golsVisitante) : "";
    setGolsMandanteInput(gM);
    setGolsVisitanteInput(gV);

    // Recupera os IDs dos autores já registrados para não perder os dados anteriores
    if (partida.finalizada && partida.autoresGols) {
      const autoresM = partida.autoresGols
        .filter((a) => a.time === "mandante")
        .map((a) => a.idJogador);
      const autoresV = partida.autoresGols
        .filter((a) => a.time === "visitante")
        .map((a) => a.idJogador);

      setAutoresMandante(autoresM);
      setAutoresVisitante(autoresV);
    } else {
      setAutoresMandante([]);
      setAutoresVisitante([]);
    }
  }

  function handleSalvar(idPartida) {
    if (golsMandanteInput === "" || golsVisitanteInput === "") {
      alert("Por favor, preencha o placar dos dois times.");
      return;
    }

    // Vincula o ID de cada autor ao respectivo nome cadastrado na lista de jogadores
    const todosOsAutores = [
      ...autoresMandante.filter(Boolean).map((id) => {
        const atleta = jogadores.find((j) => String(j.id) === String(id));
        return {
          idJogador: id,
          nomeJogador: atleta ? atleta.nome : "Desconhecido",
          time: "mandante",
        };
      }),
      ...autoresVisitante.filter(Boolean).map((id) => {
        const atleta = jogadores.find((j) => String(j.id) === String(id));
        return {
          idJogador: id,
          nomeJogador: atleta ? atleta.nome : "Desconhecido",
          time: "visitante",
        };
      }),
    ];

    onSalvarResultado(idPartida, golsMandanteInput, golsVisitanteInput, todosOsAutores);

    // Reseta o estado de edição
    setIdPartidaEmEdicao(null);
    setGolsMandanteInput("");
    setGolsVisitanteInput("");
    setAutoresMandante([]);
    setAutoresVisitante([]);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {partidas.map((partida) => {
        const estaEmEdicao = partida.id === idPartidaEmEdicao;

        const elencoMandante = jogadores.filter((j) => j.idTime === partida.idMandante);
        const elencoVisitante = jogadores.filter((j) => j.idTime === partida.idVisitante);

        return (
          <div
            key={partida.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors"
          >
            {/* Topo do Card */}
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

            {/* Confronto e Placares */}
            <div className="flex items-center justify-between gap-3 my-2">
              <span className="flex-1 text-right font-bold text-slate-800 text-sm sm:text-base truncate">
                {partida.nomeMandante}
              </span>

              {estaEmEdicao ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="0"
                    value={golsMandanteInput}
                    onChange={(e) => handleGolsMandanteChange(e.target.value)}
                    className="w-12 h-9 text-center font-bold border border-slate-300 rounded-lg focus:outline-none focus:border-green-600 bg-slate-50 text-sm"
                    placeholder="0"
                  />
                  <span className="text-slate-400 font-bold text-xs">x</span>
                  <input
                    type="number"
                    min="0"
                    value={golsVisitanteInput}
                    onChange={(e) => handleGolsVisitanteChange(e.target.value)}
                    className="w-12 h-9 text-center font-bold border border-slate-300 rounded-lg focus:outline-none focus:border-green-600 bg-slate-50 text-sm"
                    placeholder="0"
                  />
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

            {/* Formulário de Seleção dos Artilheiros */}
            {estaEmEdicao && (
              <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <p className="text-xs font-bold text-slate-600">Autores dos Gols:</p>

                {/* Mandante */}
                {autoresMandante.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-500">
                      Gols de {partida.nomeMandante}:
                    </span>
                    {autoresMandante.map((idAutor, idx) => (
                      <select
                        key={idx}
                        value={idAutor}
                        onChange={(e) => handleAutorMandanteChange(idx, e.target.value)}
                        className="w-full text-xs border border-slate-300 rounded-md p-1.5 bg-white focus:outline-none focus:border-green-600"
                      >
                        <option value="">Selecione o autor do {idx + 1}º gol...</option>
                        {elencoMandante.map((atleta) => (
                          <option key={atleta.id} value={atleta.id}>
                            #{atleta.numero} {atleta.nome} ({atleta.posicao})
                          </option>
                        ))}
                      </select>
                    ))}
                  </div>
                )}

                {/* Visitante */}
                {autoresVisitante.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-500">
                      Gols de {partida.nomeVisitante}:
                    </span>
                    {autoresVisitante.map((idAutor, idx) => (
                      <select
                        key={idx}
                        value={idAutor}
                        onChange={(e) => handleAutorVisitanteChange(idx, e.target.value)}
                        className="w-full text-xs border border-slate-300 rounded-md p-1.5 bg-white focus:outline-none focus:border-green-600"
                      >
                        <option value="">Selecione o autor do {idx + 1}º gol...</option>
                        {elencoVisitante.map((atleta) => (
                          <option key={atleta.id} value={atleta.id}>
                            #{atleta.numero} {atleta.nome} ({atleta.posicao})
                          </option>
                        ))}
                      </select>
                    ))}
                  </div>
                )}

                {autoresMandante.length === 0 && autoresVisitante.length === 0 && (
                  <p className="text-[11px] text-slate-400 italic">0 a 0 ou nenhum gol lançado ainda.</p>
                )}

                {/* Botões do Formulário */}
                <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIdPartidaEmEdicao(null)}
                    className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold px-3 py-1.5 rounded-lg cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSalvar(partida.id)}
                    className="text-xs bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1.5 rounded-lg cursor-pointer"
                  >
                    Salvar Resultado
                  </button>
                </div>
              </div>
            )}

            {/* Exibição dos Marcadores (Modo Visualização) */}
            {!estaEmEdicao && partida.finalizada && (
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
                <div className="flex flex-col items-end gap-1">
                  {partida.autoresGols
                    ?.filter((autor) => autor.time === "mandante")
                    .map((autor, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-slate-700 font-medium bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md"
                      >
                        <span>{autor.nomeJogador}</span>
                        <span className="text-[10px]">⚽</span>
                      </span>
                    ))}
                </div>

                <div className="flex flex-col items-start gap-1">
                  {partida.autoresGols
                    ?.filter((autor) => autor.time === "visitante")
                    .map((autor, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-slate-700 font-medium bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md"
                      >
                        <span className="text-[10px]">⚽</span>
                        <span>{autor.nomeJogador}</span>
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* Rodapé com Ações: Lançar Placar ou Editar Resultado */}
            {!estaEmEdicao && (
              <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
                {partida.finalizada ? (
                  <button
                    type="button"
                    onClick={() => handleIniciarEdicao(partida)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    Editar Resultado
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleIniciarEdicao(partida)}
                    className="text-xs font-semibold text-green-700 hover:text-green-800 hover:bg-green-50 px-3 py-1.5 rounded-lg border border-green-200 transition-colors cursor-pointer"
                  >
                    Lançar Placar
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}