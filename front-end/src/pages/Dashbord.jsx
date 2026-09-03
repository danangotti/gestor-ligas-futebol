import { useState } from "react";
import { Link } from "react-router-dom";
import ModalCriarLiga from "../components/ModalCriarLiga";
import { HeaderDashbord } from "../components/HeaderDashbord";

export default function PaginaDashbord() {

  // ==========================================
  // 1. ÁREA LÓGICA (Antes do return)
  // ==========================================
  const [nomeLiga, setNomeLiga] = useState("");
  const [qtdTimes, setQtdTimes] = useState("8");
  const [formatoLiga, setFormatoLiga] = useState("Pontos corridos");
  const [modalAberto, setModalAberto] = useState(false);

  const [listaDeLigas, setListaDeLigas] = useState([
    {
      id: 1,
      nome: "Copa Regional",
      quantidadeTimes: 8,
      formato: "Pontos Corridos",
      status: "Em andamento"
    },
    {
      id: 2,
      nome: "Copa Estadual",
      quantidadeTimes: 12,
      formato: "Pontos Corridos",
      status: "Em andamento"
    }
  ]);

  function salvarNovaLiga() {
    if (nomeLiga.trim() === "") {
      alert("Por favor, digite o nome da competição.");
      return;
    }

    const novaLiga = {
      id: Date.now(),
      nome: nomeLiga,
      quantidadeTimes: Number(qtdTimes),
      formato: formatoLiga,
      status: "Em andamento"
    };

    setListaDeLigas([...listaDeLigas, novaLiga]);
    setNomeLiga("");
    setModalAberto(false);
  }

  // ==========================================
  // 2. ÁREA VISUAL (Dentro do return)
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      <HeaderDashbord/>

 
      <div className="p-6 sm:p-8">
      {/* --- CABEÇALHO --- */}
      <header className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Painel de Controle
          </h1>
          <p className="text-slate-500 text-sm font-normal mt-1">
            Gerencie suas competições, tabelas e partidas em um só lugar.
          </p>
        </div>

        <button 
          onClick={() => setModalAberto(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm text-sm"
        >
          + Criar Nova Liga
        </button>
      </header>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="max-w-6xl mx-auto mt-8">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Minhas Ligas</h2>
        </div>

        {listaDeLigas.length === 0 ? (
          
          /* Empty State */
          <div className="bg-white border border-slate-200 rounded-xl p-12 mt-6 text-center shadow-sm">
            <p className="text-slate-500 text-sm mb-4">
              Você ainda não tem nenhuma liga cadastrada.
            </p>
            <button 
              onClick={() => setModalAberto(true)}
              className="text-green-600 font-medium hover:underline text-sm"
            >
              Criar minha primeira liga
            </button>
          </div>

        ) : (
          
          /* Grade de Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {listaDeLigas.map((liga) => (
              <div 
                key={liga.id} 
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div className="flex justify-between items-start gap-2 mb-3">
                  <h3 className="font-bold text-base text-slate-900">
                    {liga.nome}
                  </h3>
                  <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-md">
                    {liga.status}
                  </span>
                </div>
              
                <div className="space-y-1.5 text-sm text-slate-500 font-normal">
                  <p>
                    <span className="text-slate-900 font-medium">Equipes:</span> {liga.quantidadeTimes} times
                  </p>
                  <p>
                    <span className="text-slate-900 font-medium">Formato:</span> {liga.formato}
                  </p>
                </div>
              
                <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
                  <button className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
                    Gerenciar Liga &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>

        )}
      </main>

</div>
      {/* Chamada limpa do modal */}
      <ModalCriarLiga 
        modalAberto={modalAberto}
        setModalAberto={setModalAberto}
        nomeLiga={nomeLiga}
        setNomeLiga={setNomeLiga}
        qtdTimes={qtdTimes}
        setQtdTimes={setQtdTimes}
        formatoLiga={formatoLiga}
        setFormatoLiga={setFormatoLiga}
        salvarNovaLiga={salvarNovaLiga}
      />

    </div>
  );
}