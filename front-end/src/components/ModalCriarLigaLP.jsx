import { Link } from "react-router-dom";

export function ModalCriarLigaLP({ isOpen, onClose }) {
  // 1º Passo: Checagem de Segurança
  if (!isOpen) {
    return null;
  }

  // 2º Passo: Renderização do Modal
  return (
    // Fundo escuro cobrindo a tela inteira (ao clicar no fundo escuro, também fecha)
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      
      {/* Caixinha branca do modal (e.stopPropagation evita que clicar dentro feche a janela) */}
      <div 
        className="bg-white p-6 rounded-xl max-w-md w-full shadow-lg relative flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* TÍTULO E BOTÃO FECHAR (X) */}
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-xl font-bold text-slate-900">Como deseja prosseguir?</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-lg px-2"
          >
            ✕
          </button>
        </div>

        {/* OPÇÕES DE DECISÃO */}
        <div className="flex flex-col gap-4">
          
          {/* OPÇÃO 1: JÁ TEM CONTA */}
          <div className="flex flex-col gap-2 p-3 border rounded-lg hover:border-slate-300 transition-colors">
            <h3 className="text-sm font-semibold text-slate-700">Já possui uma conta?</h3>
            <Link 
              to="/login" 
              className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 rounded-lg text-sm transition-colors"
            >
              Entrar
            </Link>
          </div>

          {/* OPÇÃO 2: AINDA NÃO TEM CONTA */}
          <div className="flex flex-col gap-2 p-3 border rounded-lg hover:border-green-200 transition-colors">
            <h3 className="text-sm font-semibold text-slate-700">Primeira vez no Liggo?</h3>
            <Link
              to="/cadastro"
              className="w-full text-center bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 rounded-lg text-sm transition-colors shadow-sm"
            >
              Criar conta
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}