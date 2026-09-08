// Recebe 'dados' via desestruturação de props
export function TabelaClassificacao({ dados }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* overflow-x-auto garante que no celular a tabela tenha scroll horizontal e não quebre a tela */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          
          {/* Cabeçalho da Tabela */}
          <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
            <tr>
              <th scope="col" className="py-3.5 px-4 text-center w-12">Pos</th>
              <th scope="col" className="py-3.5 px-4">Clube</th>
              <th scope="col" className="py-3.5 px-3 text-center font-bold text-slate-800">PTS</th>
              <th scope="col" className="py-3.5 px-3 text-center">J</th>
              <th scope="col" className="py-3.5 px-3 text-center">V</th>
              <th scope="col" className="py-3.5 px-3 text-center">E</th>
              <th scope="col" className="py-3.5 px-3 text-center">D</th>
              <th scope="col" className="py-3.5 px-3 text-center">GP</th>
              <th scope="col" className="py-3.5 px-3 text-center">GC</th>
              <th scope="col" className="py-3.5 px-3 text-center">SG</th>
            </tr>
          </thead>

          {/* Corpo da Tabela */}
         <tbody className="divide-y divide-slate-200">
  {dados.map((time, indice) => {
    // Cálculos derivados feitos na hora da renderização
    const totalJogos = time.vitorias + time.empates + time.derrotas;
    const saldoGols = time.golsPro - time.golsSofridos;

    return (
      <tr key={time.idTime} className="hover:bg-slate-50/80 transition-colors">
        {/* Posição: índice + 1 */}
        <td className="py-3.5 px-4 text-center font-bold text-slate-700">
          {indice + 1}º
        </td>

        {/* Nome do Clube */}
        <td className="py-3.5 px-4 font-semibold text-slate-900">
          {time.nomeTime}
        </td>

        {/* Pontos (PTS) com leve destaque */}
        <td className="py-3.5 px-3 text-center font-bold text-slate-900 bg-slate-50/50">
          {time.pontos}
        </td>

        {/* Estatísticas comuns */}
        <td className="py-3.5 px-3 text-center">{totalJogos}</td>
        <td className="py-3.5 px-3 text-center">{time.vitorias}</td>
        <td className="py-3.5 px-3 text-center">{time.empates}</td>
        <td className="py-3.5 px-3 text-center">{time.derrotas}</td>
        <td className="py-3.5 px-3 text-center">{time.golsPro}</td>
        <td className="py-3.5 px-3 text-center">{time.golsSofridos}</td>

        {/* Saldo de Gols com formatação de sinal */}
        <td className="py-3.5 px-3 text-center font-semibold text-slate-800">
          {saldoGols > 0 ? `+${saldoGols}` : saldoGols}
        </td>
      </tr>
    );
  })}
</tbody>

        </table>
      </div>
    </div>
  );
}