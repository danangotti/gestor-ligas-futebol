import { useParams, Link } from "react-router-dom";
import { HeaderDashbord } from "../components/HeaderDashbord";
import { useState } from "react";
import { TabelaClassificacao } from "../components/TabelaClassificacao";
import { ListaPartida } from "../components/ListaPartida";
import { AbaTimes } from "../components/AbaTimes";
import { ModalElenco } from "../components/ModalElenco";

export default function PaginaGerenciarLiga() {
  // useParams extrai o :id que definimos na rota "/liga/:id"
  const { id } = useParams();

  // Meta de participantes definida para a competição
  const totalTimeEsperados = 3;

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
    },
    {
      id: 3,
      nome: "Time C",
      cidade: "RJ"
    }
  ]);

  // Estado para armazenar os dados da tabela de classificação
  const [classificacao, setClassificacao] = useState([
    {
      idTime: 1,
      nomeTime: "Time A",
      pontos: 0,
      vitorias: 0,
      empates: 0,
      derrotas: 0,
      golsPro: 0,
      golsSofridos: 0
    },
    {
      idTime: 2,
      nomeTime: "Time B",
      pontos: 0,
      vitorias: 0,
      empates: 0,
      derrotas: 0,
      golsPro: 0,
      golsSofridos: 0
    },
    {
      idTime: 3,
      nomeTime: "Time C",
      pontos: 0,
      vitorias: 0,
      empates: 0,
      derrotas: 0 ,
      golsPro: 0,
      golsSofridos: 0
    }
  ]);

  // Variável derivada: avalia se a meta de times foi atingida para habilitar a geração de jogos
  const podeGerarRodadas = times.length === totalTimeEsperados;

  // Lista geral de todos os jogadores da liga
  const [jogadores, setJogadores] = useState([]);

  // Guarda o objeto do time cujo modal está aberto (se for null, modal fica fechado)
  const [timeSelecionado, setTimeSelecionado] = useState(null);

  function handleAdicionarJogador(novoJogador)
   {
  setJogadores((jogadoresAntigos) => [...jogadoresAntigos, novoJogador]);
   }

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
  const partidaEncontrada = partidas.find((p) => p.id === idPartida);
  const golsMandanteNum = Number(golsMandante);
  const golsVisitanteNum = Number(golsVisitante);
  setPartidas((partidasAnteriores) => {
    return partidasAnteriores.map((partida) => {
      if (partida.id === idPartida) {
      return {
     ...partida,
     golsMandante: golsMandanteNum,
     golsVisitante: golsVisitanteNum,
     finalizada: true
     };
    }
      else{
        return partida;
      }
    });
  });

  setClassificacao((classificacaoAnterior) => {
  return classificacaoAnterior.map((linha) => {
    // 1. CASO DO MANDANTE
    if (linha.idTime === partidaEncontrada.idMandante) {
      let pontosExtras = 0;
      let vitoriasExtras = 0;
      let empatesExtras = 0;
      let derrotasExtras = 0;

      if (golsMandanteNum > golsVisitanteNum) {
        pontosExtras = 3;
        vitoriasExtras = 1;
      } else if (golsMandanteNum === golsVisitanteNum) {
        pontosExtras = 1;
        empatesExtras = 1;
      } else {
        derrotasExtras = 1;
      }

      return {
        ...linha,
        jogos: linha.jogos + 1,
        pontos: linha.pontos + pontosExtras,
        vitorias: linha.vitorias + vitoriasExtras,
        empates: linha.empates + empatesExtras,
        derrotas: linha.derrotas + derrotasExtras,
        golsPro: linha.golsPro + golsMandanteNum,
        golsSofridos: linha.golsSofridos + golsVisitanteNum
      };
    }

    // 2. CASO DO VISITANTE
    if (linha.idTime === partidaEncontrada.idVisitante) {
      let pontosExtras = 0;
      let vitoriasExtras = 0;
      let empatesExtras = 0;
      let derrotasExtras = 0;

      if (golsVisitanteNum > golsMandanteNum) {
        pontosExtras = 3;
        vitoriasExtras = 1;
      } else if (golsMandanteNum === golsVisitanteNum) {
        pontosExtras = 1;
        empatesExtras = 1;
      } else {
        derrotasExtras = 1;
      }

      return {
        ...linha,
        jogos: linha.jogos + 1,
        pontos: linha.pontos + pontosExtras,
        vitorias: linha.vitorias + vitoriasExtras,
        empates: linha.empates + empatesExtras,
        derrotas: linha.derrotas + derrotasExtras,
        golsPro: linha.golsPro + golsVisitanteNum,
        golsSofridos: linha.golsSofridos + golsMandanteNum
      };
    }

    // 3. NÃO JOGOU NESSA PARTIDA
    return linha;
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

function removerTime(idParaRemover) {
  setTimes((timesAnteriores) => {
    return timesAnteriores.filter((time) => time.id !== idParaRemover);
  });
}


const classificacaoOrdenada = [...classificacao].sort((timeA, timeB) => {
  if (timeB.pontos === timeA.pontos) {
    const saldoA = timeA.golsPro - timeA.golsSofridos;
    const saldoB = timeB.golsPro - timeB.golsSofridos;

    if(saldoA === saldoB)
      {
        return timeB.golsPro - timeA.golsPro;
      }

      return saldoB - saldoA;
  }
  return timeB.pontos - timeA.pontos;
});


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


            { abaAtiva === "partidas" && (
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
            )}
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
            <TabelaClassificacao dados={classificacaoOrdenada} />
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
          onRemoverTime={removerTime}
          setTimeSelecionado = {setTimeSelecionado}
          />
        )}

    {timeSelecionado && (
    <ModalElenco
    time={timeSelecionado}
    jogadores={jogadores}
    onAdicionarJogador={handleAdicionarJogador}
    onFechar={() => setTimeSelecionado(null)}
    />
    )}

      </main>
    </div>
  );
}