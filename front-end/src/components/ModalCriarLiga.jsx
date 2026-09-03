export default function ModalCriarLiga({
  modalAberto,
  setModalAberto,
  nomeLiga,
  setNomeLiga,
  qtdTimes,
  setQtdTimes,
  formatoLiga,
  setFormatoLiga,
  salvarNovaLiga
}) {

  // Se o modal não estiver aberto, não renderiza nada na tela
  if (!modalAberto) return null; 

  return (
    // 1. MÁSCARA ESCURA DE FUNDO
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-6 shadow-xl">
            
            {/* Topo do Modal: Título e Botão Fechar */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                Nova Competição
              </h3>
              <button 
                onClick={() => setModalAberto(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-medium"
              >
                ✕
              </button>
            </div>

            {/* Corpo Provisório */}
            <div className="py-6">
              
            <label className="block text-xs font-medium text-slate-700 mb-1">Nome da Competição
            <input 
            type="text"
            placeholder="Ex: Brasileirão 2026"
            value={nomeLiga}
            onChange={(e) => setNomeLiga(e.target.value)}
            className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-green-600"
            />
           </label>

           <label className="block text-xs font-medium text-slate-700 mb-1 mt-4">Quantidade de Equipes
            <input 
            type="number"
            min="2"
            max="32"
            value={qtdTimes}
            onChange={(e) => setQtdTimes(e.target.value)}
            className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-green-600"
            />
           </label>

           <div>
           <span className="block text-xs font-medium text-slate-700 mb-1 mt-4">Formato da Competição</span>
           <div className="grid grid-cols-2 gap-3">
            <button 
            className={`py-2.5 px-4 rounded-xl text-sm font-medium border transition-all ${
                formatoLiga === "Pontos Corridos"
                ? "border-green-600 bg-green-50 text-green-700"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            
            }`}
            type="button" onClick={() => setFormatoLiga("Pontos Corridos")}>Pontos Corridos</button>

            <button
            className={`py-2.5 px-4 rounded-xl text-sm font-medium border transition-all ${
                formatoLiga === "Mata-Mata"
                ? "border-green-600 bg-green-50 text-green-700"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            
            }`}
             type="button" onClick={() => setFormatoLiga("Mata-Mata")}>Mata-Mata</button>

           </div>
           </div>

            </div>

            {/* Rodapé do Modal: Botões de Ação */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setModalAberto(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
              onClick={salvarNovaLiga}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-xl transition-colors shadow-sm"
              >
                Salvar Liga
              </button>
            </div>

          </div>
        </div>
  );
}