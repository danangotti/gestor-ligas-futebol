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
            {/* Aqui faremos o .map() percorrendo a lista 'dados' */}
          </tbody>

        </table>
      </div>
    </div>
  );
}