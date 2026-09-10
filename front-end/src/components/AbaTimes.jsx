import { useState } from "react";

export function AbaTimes({
  times,
  jogadores = [],
  onAdicionarTime,
  ligaCheia,
  onRemoverTime,
  setTimeSelecionado,
}) {
  const [novoTimeNome, setNovoTimeNome] = useState("");
  const [novaSigla, setNovaSigla] = useState("");
  const [corTime, setCorTime] = useState("#15803d");

  function handleAdicionar(e) {
    e.preventDefault();

    if (!novoTimeNome.trim()) {
      alert("Informe o nome do time!");
      return;
    }

    const siglaFinal = novaSigla.trim()
      ? novaSigla.trim().toUpperCase()
      : novoTimeNome.trim().substring(0, 3).toUpperCase();

    onAdicionarTime({
      nome: novoTimeNome.trim(),
      sigla: siglaFinal,
      cor: corTime,
    });

    setNovoTimeNome("");
    setNovaSigla("");
    setCorTime("#15803d");
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      {/* Cabeçalho e Formulário */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
        <div>
          <h2 className="font-bold text-lg text-slate-800">Times Participantes</h2>
          <p className="text-sm text-slate-500">
            Cadastre e personalize os clubes inscritos na liga.
          </p>
        </div>

        <form onSubmit={handleAdicionar} className="flex flex-wrap items-center gap-2">
          <div
            className="flex items-center gap-1.5 border border-slate-300 rounded-lg px-2 py-1.5 bg-slate-50"
            title="Cor do clube"
          >
            <span className="text-xs text-slate-400 font-medium">Cor:</span>
            <input
              type="color"
              value={corTime}
              disabled={ligaCheia}
              onChange={(e) => setCorTime(e.target.value)}
              className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent disabled:cursor-not-allowed"
            />
          </div>

          <input
            type="text"
            maxLength={3}
            placeholder="Sigla"
            disabled={ligaCheia}
            value={novaSigla}
            onChange={(e) => setNovaSigla(e.target.value.toUpperCase())}
            className="w-20 border border-slate-300 rounded-lg px-3 py-2 text-sm uppercase text-center font-bold focus:outline-none focus:border-green-600 disabled:bg-slate-100 disabled:cursor-not-allowed"
          />

          <input
            type="text"
            placeholder={ligaCheia ? "Limite atingido" : "Nome do clube..."}
            disabled={ligaCheia}
            value={novoTimeNome}
            onChange={(e) => setNovoTimeNome(e.target.value)}
            className="flex-1 min-w-[160px] border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-600 disabled:bg-slate-100 disabled:cursor-not-allowed"
          />

          <button
            type="submit"
            disabled={ligaCheia}
            className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              ligaCheia
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
            }`}
          >
            Cadastrar
          </button>
        </form>
      </div>

      {/* Grid de Cards dos Clubes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {times.map((time) => {
          const siglaExibicao = time.sigla || time.nome.substring(0, 3).toUpperCase();
          const corExibicao = time.cor || "#15803d";
          const totalAtletas = jogadores.filter((j) => j.idTime === time.id).length;

          return (
            <div
              key={time.id}
              className="p-4 border border-slate-200 rounded-xl bg-slate-50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between gap-3"
            >
              {/* Emblema, Nome e Badges */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-xs shadow-sm shrink-0"
                  style={{ backgroundColor: corExibicao }}
                >
                  {siglaExibicao}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-800 text-sm truncate">
                    {time.nome}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] font-medium uppercase text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200 inline-block">
                      Inscrito
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-block">
                      {totalAtletas} {totalAtletas === 1 ? "atleta" : "atletas"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setTimeSelecionado(time)}
                  className="text-xs font-semibold text-slate-700 hover:text-green-700 border border-slate-300 hover:border-green-600 px-3 py-1 rounded-lg bg-white transition-colors cursor-pointer"
                >
                  Ver Elenco
                </button>

                <button
                  type="button"
                  onClick={() => onRemoverTime(time.id)}
                  className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors cursor-pointer"
                >
                  Remover
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}