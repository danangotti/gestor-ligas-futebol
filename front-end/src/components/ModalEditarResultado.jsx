import { useState } from "react";

export function ModalEditarResultado({
  partida,
  jogadores = [],
  onSalvar,
  onFechar,
}) {
  // Limite máximo de gols por equipe para proteger o navegador e a interface
  const LIMITE_MAXIMO_GOLS = 15;

  // Placares tempo regulamentar
  const [golsMandante, setGolsMandante] = useState(
    partida.finalizada ? String(partida.golsMandante) : "",
  );
  const [golsVisitante, setGolsVisitante] = useState(
    partida.finalizada ? String(partida.golsVisitante) : "",
  );

  // Placares pênaltis
  const [penaltisMandante, setPenaltisMandante] = useState(
    partida.penaltisMandante !== undefined && partida.penaltisMandante !== null
      ? String(partida.penaltisMandante)
      : "",
  );
  const [penaltisVisitante, setPenaltisVisitante] = useState(
    partida.penaltisVisitante !== undefined &&
      partida.penaltisVisitante !== null
      ? String(partida.penaltisVisitante)
      : "",
  );

  // Variável derivada de empate
  const houveEmpate =
    golsMandante !== "" &&
    golsVisitante !== "" &&
    Number(golsMandante) === Number(golsVisitante);

  // Recupera autores já existentes
  const [autoresMandante, setAutoresMandante] = useState(() => {
    if (partida.finalizada && partida.autoresGols) {
      return partida.autoresGols
        .filter((a) => a.time === "mandante")
        .map((a) => a.idJogador);
    }
    return [];
  });

  const [autoresVisitante, setAutoresVisitante] = useState(() => {
    if (partida.finalizada && partida.autoresGols) {
      return partida.autoresGols
        .filter((a) => a.time === "visitante")
        .map((a) => a.idJogador);
    }
    return [];
  });

  const elencoMandante = jogadores.filter(
    (j) => j.idTime === partida.idMandante,
  );
  const elencoVisitante = jogadores.filter(
    (j) => j.idTime === partida.idVisitante,
  );

  function handleGolsMandanteChange(valor) {
    if (valor === "") {
      setGolsMandante("");
      setAutoresMandante([]);
      return;
    }

    // Trava de 0 a 15 (clamp)
    const quantidade = Math.min(
      LIMITE_MAXIMO_GOLS,
      Math.max(0, Number(valor) || 0),
    );
    setGolsMandante(String(quantidade));

    setAutoresMandante((antigos) =>
      Array.from({ length: quantidade }, (_, i) => antigos[i] || ""),
    );
  }

  function handleGolsVisitanteChange(valor) {
    if (valor === "") {
      setGolsVisitante("");
      setAutoresVisitante([]);
      return;
    }

    // Trava de 0 a 15 (clamp)
    const quantidade = Math.min(
      LIMITE_MAXIMO_GOLS,
      Math.max(0, Number(valor) || 0),
    );
    setGolsVisitante(String(quantidade));

    setAutoresVisitante((antigos) =>
      Array.from({ length: quantidade }, (_, i) => antigos[i] || ""),
    );
  }

  function handleSalvar() {
    if (golsMandante === "" || golsVisitante === "") {
      alert("Por favor, preencha o placar dos dois times.");
      return;
    }

    if (houveEmpate && (penaltisMandante === "" || penaltisVisitante === "")) {
      alert("Houve empate no tempo normal! Preencha o resultado dos pênaltis.");
      return;
    }

    if (houveEmpate && Number(penaltisMandante) === Number(penaltisVisitante)) {
      alert("A disputa de pênaltis não pode terminar empatada!");
      return;
    }

    const todosAutores = [
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

    onSalvar(
      partida.id,
      golsMandante,
      golsVisitante,
      todosAutores,
      houveEmpate ? Number(penaltisMandante) : null,
      houveEmpate ? Number(penaltisVisitante) : null,
    );
    onFechar();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md transition-opacity">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Cabeçalho */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <h3 className="font-extrabold text-slate-800 text-sm tracking-wide uppercase">
              {partida.fase ? `Fase: ${partida.fase}` : "Lançar Resultado"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onFechar}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors text-xs font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Painel Placar Eletrônico */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white rounded-2xl p-5 shadow-inner flex items-center justify-between gap-4 border border-slate-800">
            {/* Mandante */}
            <div className="flex-1 text-center sm:text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                Mandante
              </span>
              <p className="text-base sm:text-lg font-black text-slate-100 truncate">
                {partida.nomeMandante}
              </p>
            </div>

            {/* Inputs de Gols (limitados de 0 a 15) */}
            <div className="flex items-center gap-2 bg-slate-800/90 p-2 rounded-xl border border-slate-700 shadow-xs">
              <input
                type="number"
                min="0"
                max={LIMITE_MAXIMO_GOLS}
                value={golsMandante}
                onChange={(e) => handleGolsMandanteChange(e.target.value)}
                className="w-12 h-12 text-center text-2xl font-black bg-slate-950 border border-slate-700 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                placeholder="0"
              />
              <span className="text-slate-500 font-black text-xs">✕</span>
              <input
                type="number"
                min="0"
                max={LIMITE_MAXIMO_GOLS}
                value={golsVisitante}
                onChange={(e) => handleGolsVisitanteChange(e.target.value)}
                className="w-12 h-12 text-center text-2xl font-black bg-slate-950 border border-slate-700 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                placeholder="0"
              />
            </div>

            {/* Visitante */}
            <div className="flex-1 text-center sm:text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                Visitante
              </span>
              <p className="text-base sm:text-lg font-black text-slate-100 truncate">
                {partida.nomeVisitante}
              </p>
            </div>
          </div>

          {/* Disputa por Pênaltis (Aparece se houver empate) */}
          {houveEmpate && (
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 transition-all">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-sm">⚡</span>
                <p className="text-xs font-black text-amber-900 uppercase tracking-wider">
                  Decisão nos Pênaltis
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <span className="text-xs font-bold text-slate-700 max-w-[110px] truncate text-right">
                  {partida.nomeMandante}
                </span>

                <input
                  type="number"
                  min="0"
                  value={penaltisMandante}
                  onChange={(e) => setPenaltisMandante(e.target.value)}
                  className="w-12 h-10 text-center text-base font-black bg-white border border-amber-300 rounded-xl text-amber-950 focus:border-amber-600 focus:ring-2 focus:ring-amber-400/20 focus:outline-none shadow-xs"
                  placeholder="0"
                />

                <span className="text-xs font-black text-amber-600">x</span>

                <input
                  type="number"
                  min="0"
                  value={penaltisVisitante}
                  onChange={(e) => setPenaltisVisitante(e.target.value)}
                  className="w-12 h-10 text-center text-base font-black bg-white border border-amber-300 rounded-xl text-amber-950 focus:border-amber-600 focus:ring-2 focus:ring-amber-400/20 focus:outline-none shadow-xs"
                  placeholder="0"
                />

                <span className="text-xs font-bold text-slate-700 max-w-[110px] truncate text-left">
                  {partida.nomeVisitante}
                </span>
              </div>
            </div>
          )}

          {/* Seleção de Autores dos Gols */}
          {(autoresMandante.length > 0 || autoresVisitante.length > 0) && (
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span>⚽</span>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Quem marcou os gols?
                </h4>
              </div>

              {/* Gols Mandante */}
              {autoresMandante.length > 0 && (
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2.5">
                  <span className="text-xs font-bold text-slate-700 block">
                    Gols de {partida.nomeMandante}:
                  </span>
                  <div className="space-y-2">
                    {autoresMandante.map((idAutor, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-slate-400 w-5">
                          #{idx + 1}
                        </span>
                        <select
                          value={idAutor}
                          onChange={(e) => {
                            const novo = [...autoresMandante];
                            novo[idx] = e.target.value;
                            setAutoresMandante(novo);
                          }}
                          className="flex-1 text-xs font-medium border border-slate-200 rounded-xl p-2 bg-white text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 shadow-2xs"
                        >
                          <option value="">Selecione o autor...</option>
                          {elencoMandante.map((a) => (
                            <option key={a.id} value={a.id}>
                              #{a.numero} {a.nome} ({a.posicao})
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gols Visitante */}
              {autoresVisitante.length > 0 && (
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2.5">
                  <span className="text-xs font-bold text-slate-700 block">
                    Gols de {partida.nomeVisitante}:
                  </span>
                  <div className="space-y-2">
                    {autoresVisitante.map((idAutor, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-slate-400 w-5">
                          #{idx + 1}
                        </span>
                        <select
                          value={idAutor}
                          onChange={(e) => {
                            const novo = [...autoresVisitante];
                            novo[idx] = e.target.value;
                            setAutoresVisitante(novo);
                          }}
                          className="flex-1 text-xs font-medium border border-slate-200 rounded-xl p-2 bg-white text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 shadow-2xs"
                        >
                          <option value="">Selecione o autor...</option>
                          {elencoVisitante.map((a) => (
                            <option key={a.id} value={a.id}>
                              #{a.numero} {a.nome} ({a.posicao})
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Rodapé com Botões de Ação */}
        <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onFechar}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSalvar}
            className="px-5 py-2.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 active:scale-95 rounded-xl transition-all shadow-sm shadow-green-600/25 cursor-pointer"
          >
            Salvar Resultado
          </button>
        </div>
      </div>
    </div>
  );
}
