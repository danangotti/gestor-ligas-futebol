import { useState } from "react";

export function AbaTimes({ times, onAdicionarTime, ligaCheia }) {
  // Estado para controlar o que o usuário digita no input
  const [novoTimeNome, setNovoTimeNome] = useState("");

  function handleAdicionar() {
    // Evita adicionar times vazios ou só com espaços
    if (novoTimeNome.trim() === "") {
      alert("Informe o nome do time!");
      return;
    }

    // Passa o nome para o componente pai
    onAdicionarTime(novoTimeNome.trim());

    // Limpa a caixinha de texto
    setNovoTimeNome("");
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      {/* Topo: Título e formulário */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
        <div>
          <h2 className="font-bold text-lg text-slate-800">Times Participantes</h2>
          <p className="text-sm text-slate-500">Gerencie os clubes inscritos.</p>
        </div>

        <div className="flex items-center gap-2">
          <input
          type="text"
          placeholder={ligaCheia ? "Limite de times atingido" : "Nome do time..."}
          disabled={ligaCheia}
          value={novoTimeNome}
          onChange={(e) => setNovoTimeNome(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-600 disabled:bg-slate-100 disabled:cursor-not-allowed"
/>
          <button
          type="button"
          disabled={ligaCheia}
          onClick={handleAdicionar}
          className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
    ligaCheia
      ? "bg-slate-200 text-slate-400 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
  }`}
>
  Cadastrar
</button>
        </div>
      </div>

      {/* Lista de times criada por você */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {times.map((time) => {
          return (
            <div
              key={time.id}
              className="p-3 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between"
            >
              <p className="font-semibold text-slate-800 text-sm">
                {time.nome}
              </p>
              <span className="text-xs text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                Inscrito
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}