import { useState } from "react";

export function ModalElenco({ time, jogadores, onAdicionarJogador, onFechar }) {
  // Estado local para o input do formulário
  const [nomeJogador, setNomeJogador] = useState("");

  // Filtra apenas os jogadores pertencentes a este clube
  const jogadoresDoTime = jogadores.filter(
    (jogador) => jogador.idTime === time.id
  );

  function handleSubmit(evento) {
    evento.preventDefault();

    // Impede cadastro com campo vazio
    if (!nomeJogador.trim()) return;

    const novoAtleta = {
      id: Date.now(),
      idTime: time.id,
      nome: nomeJogador.trim(),
    };

    // Envia o atleta para o estado global no componente pai
    onAdicionarJogador(novoAtleta);

    // Limpa o campo
    setNomeJogador("");
  }

  return (
    // Fundo escuro cobrindo a tela (overlay)
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      {/* Caixa do modal */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-800">
            Elenco: {time.nome}
          </h3>
          <button
            type="button"
            onClick={onFechar}
            className="text-slate-400 hover:text-slate-600 font-bold"
          >
            ✕
          </button>
        </div>

        {/* Formulário de cadastro */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Nome do atleta"
            value={nomeJogador}
            onChange={(e) => setNomeJogador(e.target.value)}
            className="flex-1 text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-green-600"
          />
          <button
            type="submit"
            className="text-sm font-semibold bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg"
          >
            Adicionar
          </button>
        </form>

        {/* Lista de atletas deste clube */}
        <div className="max-h-60 overflow-y-auto">
          {jogadoresDoTime.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">
              Nenhum jogador cadastrado neste elenco ainda.
            </p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {jogadoresDoTime.map((atleta) => (
                <li key={atleta.id} className="py-2 text-sm text-slate-700">
                  {atleta.nome}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}