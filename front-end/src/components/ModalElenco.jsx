import { useState } from "react";

export function ModalElenco({ time, jogadores, onAdicionarJogador, onFechar }) {
  // Estados para os dados do atleta
  const [nomeJogador, setNomeJogador] = useState("");
  const [numeroCamisa, setNumeroCamisa] = useState("");
  const [posicao, setPosicao] = useState("MEI");

  // Filtra apenas os jogadores pertencentes a este clube
  const jogadoresDoTime = jogadores.filter(
    (jogador) => jogador.idTime === time.id
  );

  const corClube = time.cor || "#15803d";
  const siglaClube = time.sigla || time.nome.substring(0, 3).toUpperCase();

  function handleSubmit(evento) {
    evento.preventDefault();

    if (!nomeJogador.trim()) return;

    const novoAtleta = {
      id: Date.now(),
      idTime: time.id,
      nome: nomeJogador.trim(),
      numero: numeroCamisa.trim() || "--",
      posicao: posicao,
    };

    onAdicionarJogador(novoAtleta);

    // Limpa os campos do formulário
    setNomeJogador("");
    setNumeroCamisa("");
    setPosicao("MEI");
  }

  // Cores das badges de posição
  const coresPosicao = {
    GOL: "bg-amber-100 text-amber-800 border-amber-200",
    DEF: "bg-blue-100 text-blue-800 border-blue-200",
    MEI: "bg-emerald-100 text-emerald-800 border-emerald-200",
    ATA: "bg-rose-100 text-rose-800 border-rose-200",
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100">
        
        {/* Cabeçalho do Modal estilizado com a cor do time */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm shrink-0"
              style={{ backgroundColor: corClube }}
            >
              {siglaClube}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {time.nome}
                </h3>
                <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-semibold">
                  {jogadoresDoTime.length} atletas
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Gestão de elenco e numeração</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onFechar}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Formulário de Cadastro do Atleta */}
        <form onSubmit={handleSubmit} className="p-5 border-b border-slate-100 bg-white">
          <div className="flex flex-wrap sm:flex-nowrap gap-2 mb-2">
            
            {/* Input Número da Camisa */}
            <input
              type="number"
              min="1"
              max="99"
              placeholder="Nº"
              value={numeroCamisa}
              onChange={(e) => setNumeroCamisa(e.target.value)}
              className="w-16 border border-slate-300 rounded-lg px-2 py-2 text-sm text-center font-bold focus:outline-none focus:border-green-600"
            />

            {/* Select de Posição */}
            <select
              value={posicao}
              onChange={(e) => setPosicao(e.target.value)}
              className="border border-slate-300 rounded-lg px-2 py-2 text-sm font-semibold text-slate-700 bg-white focus:outline-none focus:border-green-600"
            >
              <option value="GOL">GOL (Goleiro)</option>
              <option value="DEF">DEF (Defensor)</option>
              <option value="MEI">MEI (Meio-campo)</option>
              <option value="ATA">ATA (Atacante)</option>
            </select>

            {/* Input Nome do Atleta */}
            <input
              type="text"
              placeholder="Nome do atleta..."
              value={nomeJogador}
              onChange={(e) => setNomeJogador(e.target.value)}
              className="flex-1 min-w-[140px] border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-600"
            />

            {/* Botão Adicionar */}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer shrink-0"
            >
              Adicionar
            </button>
          </div>
        </form>

        {/* Listagem do Elenco */}
        <div className="p-5 max-h-72 overflow-y-auto bg-slate-50/50">
          {jogadoresDoTime.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm font-medium text-slate-600">Nenhum jogador cadastrado</p>
              <p className="text-xs text-slate-400 mt-1">
                Adicione os atletas acima com seus respectivos números e posições.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {jogadoresDoTime.map((atleta) => (
                <li
                  key={atleta.id}
                  className="flex items-center gap-3 p-2.5 bg-white border border-slate-200 rounded-xl shadow-2xs"
                >
                  {/* Número da Camisa */}
                  <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-black text-xs text-slate-700 shrink-0">
                    {atleta.numero || "--"}
                  </span>

                  {/* Nome do Jogador */}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-800 text-sm truncate">
                      {atleta.nome}
                    </p>
                  </div>

                  {/* Tag da Posição */}
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${
                      coresPosicao[atleta.posicao] || "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {atleta.posicao || "MEI"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Rodapé do Modal */}
        <div className="p-4 bg-white border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onFechar}
            className="text-xs font-semibold px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Concluir
          </button>
        </div>

      </div>
    </div>
  );
}