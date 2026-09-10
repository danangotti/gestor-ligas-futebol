export function TabelaArtilharia({ partidas = [], jogadores = [], times = [] }) {
  // 1. Dicionário para contar gols por id do jogador
  const mapaGols = {};

  partidas.forEach((partida) => {
    if (partida.finalizada && partida.autoresGols) {
      partida.autoresGols.forEach((gol) => {
        const id = String(gol.idJogador);
        mapaGols[id] = (mapaGols[id] || 0) + 1;
      });
    }
  });

  // 2. Monta a lista combinando dados do jogador, do time e os gols marcados
  const listaArtilheiros = jogadores
    .map((atleta) => {
      const timeDoAtleta = times.find((t) => t.id === atleta.idTime);
      return {
        id: atleta.id,
        nome: atleta.nome,
        numero: atleta.numero,
        posicao: atleta.posicao,
        nomeTime: timeDoAtleta ? timeDoAtleta.nome : "Time",
        gols: mapaGols[String(atleta.id)] || 0,
      };
    })
    .filter((atleta) => atleta.gols > 0)
    .sort((a, b) => b.gols - a.gols);

  if (listaArtilheiros.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
        <p className="text-slate-700 font-semibold text-base">
          Nenhum gol registrado ainda
        </p>
        <p className="text-slate-400 text-sm mt-1">
          Lance os placares com os autores dos gols na aba de Partidas para alimentar a artilharia.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden">
      <div className="border-b border-slate-100 pb-4 mb-4">
        <h2 className="font-bold text-lg text-slate-800">Tabela de Artilharia</h2>
        <p className="text-sm text-slate-500">Goleadores da competição.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 text-xs uppercase font-semibold">
              <th className="py-2.5 px-3 text-center w-12">#</th>
              <th className="py-2.5 px-3">Atleta</th>
              <th className="py-2.5 px-3">Clube</th>
              <th className="py-2.5 px-3 text-center">Posição</th>
              <th className="py-2.5 px-3 text-center font-bold text-slate-700">Gols</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {listaArtilheiros.map((atleta, index) => (
              <tr key={atleta.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-3 text-center font-bold text-slate-500">
                  {index + 1}º
                </td>
                <td className="py-3 px-3 font-semibold text-slate-800">
                  #{atleta.numero} {atleta.nome}
                </td>
                <td className="py-3 px-3 text-slate-600">
                  {atleta.nomeTime}
                </td>
                <td className="py-3 px-3 text-center">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200 bg-slate-100 text-slate-700">
                    {atleta.posicao}
                  </span>
                </td>
                <td className="py-3 px-3 text-center font-black text-green-700">
                  {atleta.gols}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}