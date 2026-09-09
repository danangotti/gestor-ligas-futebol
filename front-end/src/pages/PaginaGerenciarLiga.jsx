import { useParams, Link } from "react-router-dom";
import { HeaderDashbord } from "../components/HeaderDashbord";
import { useState } from "react";
import { TabelaClassificacao } from "../components/TabelaClassificacao";
import { ListaPartida } from "../components/ListaPartida";
import { AbaTimes } from "../components/AbaTimes";

export default function PaginaGerenciarLiga() {
  // useParams extrai o :id que definimos na rota "/liga/:id"
  const { id } = useParams();

  // Meta de participantes definida para a competição
  const totalTimeEsperados = 2;

  // Estado para armazenar os confrontos gerados pelo algoritmo
  const [partidas, setPartidas] = useState([]);

  // Estado para controlar a aba selecionada ("classificacao", "partidas" ou "times")
  const [abaAtiva, setAbaAtiva] = useState("classificacao");

  // Estado com a lista atual de clubes cadastrados na liga
  const [times, setTimes] = useState([
    {
      id: 1,
      nome: "Time A",
      cidade: "BH"
    },
    {
      id: 2,
      nome: "Time B",
      cidade: "RJ"
    }
  ]);

  // Estado para armazenar os dados da tabela de classificação
  const [classificacao, setClassificacao] = useState([
    {
      idTime: 1,
      nomeTime: "Time A",
      pontos: 3,
      vitorias: 1,
      empates: 0,
      derrotas: 0,
      golsPro: 2,
      golsSofridos: 1
    },
    {
      idTime: 2,
      nomeTime: "Time B",
      pontos: 0,
      vitorias: 0,
      empates: 0,
      derrotas: 1,
      golsPro: 1,
      golsSofridos: 2
    }
  ]);

  // Variável derivada: avalia se a meta de times foi atingida para habilitar a geração de jogos
  const podeGerarRodadas = times.length === totalTimeEsperados;

  // Algoritmo Round-Robin (todos contra todos em turno único sem repetição)
  function gerarPartidas() {
    // Guarda de segurança: impede execução caso a meta de times não esteja completa
    if (!podeGerarRodadas) {
      return;
    }

    const novasPartidas = [];
    let contadorId = 1;

    // Laço externo: fixa o time mandante
    for (let indiceMandante = 0; indiceMandante < times.length; indiceMandante++) {
      
      // Laço interno: combina apenas com os times subsequentes (evita duplicações e confronto contra si mesmo)
      for (let indiceVisitante = indiceMandante + 1; indiceVisitante < times.length; indiceVisitante++) {
        const timeMandante = times[indiceMandante];
        const timeVisitante = times[indiceVisitante];

        // Objeto alinhado com a modelagem do back-end / tabela 'partida'
        const partidaCriada = {
          id: contadorId,
          idMandante: timeMandante.id,
          nomeMandante: timeMandante.nome,
          idVisitante: timeVisitante.id,
          nomeVisitante: timeVisitante.nome,
          golsMandante: 0,
          golsVisitante: 0,
          finalizada: false
        };

        novasPartidas.push(partidaCriada);
        contadorId++;
      }
    }

    // Persiste os jogos gerados no estado local
    setPartidas(novasPartidas);
    console.log("Partidas geradas com sucesso:", novasPartidas);
  
  }

 function atualizarResultadoPartida(idPartida, golsMandante, golsVisitante) {
  setPartidas((partidasAnteriores) => {
    return partidasAnteriores.map((partida) => {
      if (partida.id === idPartida) {
      return {
    ...partida, // copia todos os dados originais da partida que nao precisam sser alteradas
    golsMandante: Number(golsMandante), // sobrescreve apenas o que mudou
    golsVisitante: Number(golsVisitante),
    finalizada: true
  };
}
      else{
        return partida;
      }
    });
  });
}

function cadastrarTime(nomeRecebido) {

  if(times.length >= totalTimeEsperados){
    return alert("Limite de times atingido!")
  }

  const novoClube = {
    id: Date.now(),
    nome: nomeRecebido
  };

  setTimes((timesAnteriores) => {
    return [...timesAnteriores, novoClube];
  });
}


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <HeaderDashbord />

      <main className="max-w-6xl mx-auto p-6 sm:p-8">
        
        {/* Link de retorno para a listagem geral de ligas */}
        <Link 
          to="/dashbord" 
          className="text-sm font-medium text-slate-500 hover:text-green-600 transition-colors inline-block mb-4"
        >
          ← Voltar para Minhas Ligas
        </Link>

        {/* Card principal com as informações da liga e a área de ação */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          
          {/* Informações textuais da liga */}
          <div>
            <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-md">
              ID da Liga: {id}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Painel de Gestão da Competição
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Gerencie a tabela de classificação, os times participantes e as rodadas.
            </p>
          </div>

          {/* Bloco de controle: progresso de times e gatilho de geração de rodadas */}
          <div className="flex flex-col sm:items-end gap-2.5 bg-slate-50 sm:bg-transparent p-4 sm:p-0 rounded-xl border sm:border-0 border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Clubes inscritos:</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                podeGerarRodadas 
                  ? "bg-green-100 text-green-700" 
                  : "bg-amber-100 text-amber-700"
              }`}>
                {times.length} / {totalTimeEsperados}
              </span>
            </div>

            <button
              type="button"
              disabled={!podeGerarRodadas}
              onClick={gerarPartidas}
              className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 shadow-sm ${
                podeGerarRodadas
                  ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer active:scale-95"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
              }`}
            >
              Gerar Tabela de Jogos
            </button>
          </div>

        </div>

        {/* BARRA DE NAVEGAÇÃO POR ABAS (TABS) */}
        <div className="flex border-b border-slate-200 mb-6 gap-8">
          <button
            type="button"
            onClick={() => setAbaAtiva("classificacao")}
            className={`pb-3 text-sm transition-colors relative ${
              abaAtiva === "classificacao"
                ? "text-green-600 border-b-2 border-green-600 font-semibold"
                : "text-slate-500 hover:text-slate-700 font-medium"
            }`}
          >
            Classificação
          </button>

          <button
            type="button"
            onClick={() => setAbaAtiva("partidas")}
            className={`pb-3 text-sm transition-colors relative ${
              abaAtiva === "partidas"
                ? "text-green-600 border-b-2 border-green-600 font-semibold"
                : "text-slate-500 hover:text-slate-700 font-medium"
            }`}
          >
            Partidas
          </button>

          <button
            type="button"
            onClick={() => setAbaAtiva("times")}
            className={`pb-3 text-sm transition-colors relative ${
              abaAtiva === "times"
                ? "text-green-600 border-b-2 border-green-600 font-semibold"
                : "text-slate-500 hover:text-slate-700 font-medium"
            }`}
          >
            Times
          </button>
        </div>

        {/* ÁREA DE CONTEÚDO CONDICIONAL DAS ABAS */}
        {abaAtiva === "classificacao" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-lg text-slate-800">Tabela de Classificação</h2>
            <p className="text-sm text-slate-500 mt-1">Aqui construiremos a tabela de pontos corridos.</p>
            <TabelaClassificacao dados={classificacao} />
          </div>
        )}

        {abaAtiva === "partidas" && (
          <ListaPartida 
          partidas={partidas} 
          onSalvarResultado={atualizarResultadoPartida} 
          />
            )}

        {abaAtiva === "times" && (
          <AbaTimes
          times = {times}
          onAdicionarTime = {cadastrarTime}
          ligaCheia={podeGerarRodadas}
          />
        )}

      </main>
    </div>
  );
}