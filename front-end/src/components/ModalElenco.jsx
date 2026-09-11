import { useState } from "react";

export function ModalElenco({
  time,
  jogadores = [],
  onAdicionarJogador,
  onRemoverJogador,
  onFechar,
}) {
  // Controle do formulário de novo atleta
  const [nomeJogador, setNomeJogador] = useState("");
  const [numeroCamisa, setNumeroCamisa] = useState("");
  const [posicao, setPosicao] = useState("MEI");

  // Filtra apenas os jogadores inscritos neste clube específico
  const jogadoresDoTime = jogadores.filter(
    (jogador) => jogador.idTime === time.id
  );

  // Fallbacks visuais caso o time não possua cor ou sigla definidas
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

    // Reseta os campos após o cadastro
    setNomeJogador("");
    setNumeroCamisa("");
    setPosicao("MEI");
  }

  // Mapeamento visual das posições táticas
  const estiloPosicao = {
    GOL: { label: "Goleiro", classe: "bg-amber-50 text-amber-700 border-amber-200" },
    DEF: { label: "Defesa", classe: "bg-blue-50 text-blue-700 border-blue-200" },
    MEI: { label: "Meio", classe: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    ATA: { label: "Ataque", classe: "bg-rose-50 text-rose-700 border-rose-200" },
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        
        {/* Topo: Identidade do Clube e Fechamento */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3.5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm shrink-0 tracking-wider"
              style={{ backgroundColor: corClube }}
            >
              {siglaClube}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {time.nome}
                </h3>
                <span className="text-xs bg-slate-200/80 text-slate-700 px-2.5 py-0.5 rounded-full font-bold">
                  {jogadoresDoTime.length} {jogadoresDoTime.length === 1 ? "atleta" : "atletas"}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Gestão de elenco e numeração da liga</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onFechar}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            title="Fechar modal"
          >
            ✕
          </button>
        </div>

        {/* Formulário: Adicionar Novo Atleta */}
        <form onSubmit={handleSubmit} className="p-4 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="99"
              placeholder="Nº"
              value={numeroCamisa}
              onChange={(e) => setNumeroCamisa(e.target.value)}
              className="w-14 border border-slate-300 rounded-lg px-2 py-2 text-sm text-center font-bold text-slate-800 focus:outline-none focus:border-green-600"
            />

            <select
              value={posicao}
              onChange={(e) => setPosicao(e.target.value)}
              className="border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-green-600 cursor-pointer"
            >
              <option value="GOL">GOL</option>
              <option value="DEF">DEF</option>
              <option value="MEI">MEI</option>
              <option value="ATA">ATA</option>
            </select>

            <input
              type="text"
              placeholder="Nome do jogador..."
              value={nomeJogador}
              onChange={(e) => setNomeJogador(e.target.value)}
              className="flex-1 min-w-[130px] border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-600"
            />

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer shrink-0"
            >
              Adicionar
            </button>
          </div>
        </form>

        {/* Corpo: Lista com Scroll Interno */}
        <div className="p-4 overflow-y-auto flex-1 bg-slate-50/50">
          {jogadoresDoTime.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-10 h-10 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-sm mb-2">
                👥
              </div>
              <p className="text-sm font-semibold text-slate-700">Nenhum jogador inscrito</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Adicione atletas acima para montar o elenco deste clube na competição.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {jogadoresDoTime.map((atleta) => {
                const configPos = estiloPosicao[atleta.posicao] || estiloPosicao.MEI;

                return (
                  <li
                    key={atleta.id}
                    className="flex items-center gap-2.5 p-2.5 bg-white border border-slate-200 rounded-xl shadow-2xs hover:border-slate-300 transition-all"
                  >
                    {/* Número da Camisa */}
                    <span className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center font-black text-xs text-slate-700 shrink-0">
                      {atleta.numero || "--"}
                    </span>

                    {/* Nome do Atleta */}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-800 text-xs truncate">
                        {atleta.nome}
                      </p>
                    </div>

                    {/* Badge de Posição */}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${configPos.classe}`}
                    >
                      {atleta.posicao}
                    </span>

                    {/* Ação: Remover Atleta */}
                    <button
                      type="button"
                      onClick={() => onRemoverJogador(atleta.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0 cursor-pointer text-xs"
                      title="Remover atleta do elenco"
                    >
                      ✕
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Rodapé: Botão de Conclusão */}
        <div className="p-3.5 bg-white border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onFechar}
            className="text-xs font-semibold px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}