import { useParams, Link } from "react-router-dom";
import { HeaderDashbord } from "../components/HeaderDashbord";
import { useState } from "react";
import { TabelaClassificacao } from "../components/TabelaClassificacao";
import { ListaPartida } from "../components/ListaPartida";
import { AbaTimes } from "../components/AbaTimes";
import { ModalElenco } from "../components/ModalElenco";
import { TabelaArtilharia } from "../components/TabelaArtilharia";

export default function PaginaGerenciarLiga() {
  const { id } = useParams();

  // Meta de participantes definida para a competição
  const totalTimeEsperados = 3;

  // Estados principais da liga
  const [partidas, setPartidas] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState("classificacao");
  const [timeSelecionado, setTimeSelecionado] = useState(null);

  // Lista inicial de clubes cadastrados
  const [times, setTimes] = useState([
    { id: 1, nome: "Time A", cidade: "BH" },
    { id: 2, nome: "Time B", cidade: "RJ" },
    { id: 3, nome: "Time C", cidade: "RJ" },
  ]);

  // Tabela inicial de classificação
  const [classificacao, setClassificacao] = useState([
    { idTime: 1, nomeTime: "Time A", jogos: 0, pontos: 0, vitorias: 0, empates: 0, derrotas: 0, golsPro: 0, golsSofridos: 0 },
    { idTime: 2, nomeTime: "Time B", jogos: 0, pontos: 0, vitorias: 0, empates: 0, derrotas: 0, golsPro: 0, golsSofridos: 0 },
    { idTime: 3, nomeTime: "Time C", jogos: 0, pontos: 0, vitorias: 0, empates: 0, derrotas: 0, golsPro: 0, golsSofridos: 0 },
  ]);

  // Atletas cadastrados
  const [jogadores, setJogadores] = useState([
    // Time A (id: 1)
    { id: 101, idTime: 1, nome: "Carlos Eduardo", numero: "9", posicao: "ATA" },
    { id: 102, idTime: 1, nome: "Danilo Silva", numero: "10", posicao: "MEI" },
    { id: 103, idTime: 1, nome: "Lucas Moura", numero: "4", posicao: "DEF" },

    // Time B (id: 2)
    { id: 201, idTime: 2, nome: "Gabriel Barbosa", numero: "9", posicao: "ATA" },
    { id: 202, idTime: 2, nome: "Everton Ribeiro", numero: "7", posicao: "MEI" },
    { id: 203, idTime: 2, nome: "David Luiz", numero: "3", posicao: "DEF" },

    // Time C (id: 3)
    { id: 301, idTime: 3, nome: "Pedro Raul", numero: "9", posicao: "ATA" },
    { id: 302, idTime: 3, nome: "Rodrigo Garro", numero: "8", posicao: "MEI" },
    { id: 303, idTime: 3, nome: "Fagner", numero: "23", posicao: "DEF" },
  ]);

  // Variável derivada: avalia se a meta de times foi atingida
  const podeGerarRodadas = times.length === totalTimeEsperados;

  function handleAdicionarJogador(novoJogador) {
    setJogadores((jogadoresAntigos) => [...jogadoresAntigos, novoJogador]);
  }

  function handleRemoverJogador(idJogadorParaRemover) {
    setJogadores((jogadoresAnteriores) =>
      jogadoresAnteriores.filter((jogador) => jogador.id !== idJogadorParaRemover)
    );
  }

  // Algoritmo Round-Robin (todos contra todos em turno único)
  function gerarPartidas() {
    if (!podeGerarRodadas) return;

    const novasPartidas = [];
    let contadorId = 1;

    for (let i = 0; i < times.length; i++) {
      for (let j = i + 1; j < times.length; j++) {
        novasPartidas.push({
          id: contadorId,
          idMandante: times[i].id,
          nomeMandante: times[i].nome,
          idVisitante: times[j].id,
          nomeVisitante: times[j].nome,
          golsMandante: 0,
          golsVisitante: 0,
          finalizada: false,
          autoresGols: [],
        });
        contadorId++;
      }
    }

    setPartidas(novasPartidas);
  }

  function atualizarResultadoPartida(idPartida, golsMandante, golsVisitante, autoresGols = []) {
    const partidaEncontrada = partidas.find((p) => p.id === idPartida);
    const golsMandanteNum = Number(golsMandante);
    const golsVisitanteNum = Number(golsVisitante);

    setPartidas((partidasAnteriores) =>
      partidasAnteriores.map((partida) => {
        if (partida.id === idPartida) {
          return {
            ...partida,
            golsMandante: golsMandanteNum,
            golsVisitante: golsVisitanteNum,
            autoresGols: autoresGols,
            finalizada: true,
          };
        }
        return partida;
      })
    );

    setClassificacao((classificacaoAnterior) =>
      classificacaoAnterior.map((linha) => {
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
            golsSofridos: linha.golsSofridos + golsVisitanteNum,
          };
        }

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
            golsSofridos: linha.golsSofridos + golsMandanteNum,
          };
        }

        return linha;
      })
    );
  }

  function cadastrarTime(dadosTime) {
    if (times.length >= totalTimeEsperados) {
      return alert("Limite de times atingido!");
    }

    const idGerado = Date.now();

    const novoClube = {
      id: idGerado,
      nome: dadosTime.nome,
      sigla: dadosTime.sigla,
      cor: dadosTime.cor,
    };

    setTimes((timesAnteriores) => [...timesAnteriores, novoClube]);

    const novaLinhaClassificacao = {
      idTime: idGerado,
      nomeTime: dadosTime.nome,
      jogos: 0,
      pontos: 0,
      vitorias: 0,
      empates: 0,
      derrotas: 0,
      golsPro: 0,
      golsSofridos: 0,
    };

    setClassificacao((classificacaoAnterior) => [
      ...classificacaoAnterior,
      novaLinhaClassificacao,
    ]);
  }

  function removerTime(idParaRemover) {
    setTimes((timesAnteriores) =>
      timesAnteriores.filter((time) => time.id !== idParaRemover)
    );
  }

  // Ordenação da tabela por critérios de desempate
  const classificacaoOrdenada = [...classificacao].sort((timeA, timeB) => {
    if (timeB.pontos === timeA.pontos) {
      const saldoA = timeA.golsPro - timeA.golsSofridos;
      const saldoB = timeB.golsPro - timeB.golsSofridos;

      if (saldoA === saldoB) {
        return timeB.golsPro - timeA.golsPro;
      }
      return saldoB - saldoA;
    }
    return timeB.pontos - timeA.pontos;
  });

  // Métricas derivadas para os cards de resumo
  const liderAtual = classificacaoOrdenada.length > 0 ? classificacaoOrdenada[0] : null;
  const partidasFinalizadas = partidas.filter((p) => p.finalizada).length;
  const totalGolsLiga = partidas.reduce((acumulador, p) => {
    if (p.finalizada) {
      return acumulador + p.golsMandante + p.golsVisitante;
    }
    return acumulador;
  }, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <HeaderDashbord />

      <main className="max-w-6xl mx-auto p-6 sm:p-8">
        
        {/* Link de Retorno */}
        <Link 
          to="/dashbord" 
          className="text-sm font-medium text-slate-500 hover:text-green-600 transition-colors inline-block mb-4"
        >
          ← Voltar para Minhas Ligas
        </Link>

        {/* 1. Banner Superior com Título e Ação de Gerar Rodadas */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
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

          <div className="flex flex-col sm:items-end gap-2.5 bg-slate-50 sm:bg-transparent p-4 sm:p-0 rounded-xl border sm:border-0 border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Clubes inscritos:</span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  podeGerarRodadas 
                    ? "bg-green-100 text-green-700" 
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {times.length} / {totalTimeEsperados}
              </span>
            </div>

            {abaAtiva === "partidas" && (
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

        {/* 2. Cards de Resumo da Competição (Grade Separada) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-6">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Clubes
            </span>
            <p className="text-xl font-bold text-slate-800 mt-1">
              {times.length}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Jogos Disputados
            </span>
            <p className="text-xl font-bold text-slate-800 mt-1">
              {partidasFinalizadas} <span className="text-xs font-normal text-slate-400">/ {partidas.length}</span>
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Gols Marcados
            </span>
            <p className="text-xl font-bold text-green-700 mt-1">
              {totalGolsLiga}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Líder Atual
            </span>
            <p className="text-sm font-bold text-slate-800 mt-1 truncate">
              {liderAtual && liderAtual.jogos > 0 ? liderAtual.nomeTime : "Aguardando início"}
            </p>
          </div>
        </div>

        {/* 3. Barra de Navegação por Abas */}
        <div className="flex border-b border-slate-200 mb-6 gap-8">
          <button
            type="button"
            onClick={() => setAbaAtiva("classificacao")}
            className={`pb-3 text-sm transition-colors relative ${
              abaAtiva === "classificacao"
                ? "text-green-600 border-b-2 border-green-600 font-semibold"
                : "text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
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
                : "text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
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
                : "text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
            }`}
          >
            Times
          </button>

          <button
            type="button"
            onClick={() => setAbaAtiva("artilharia")}
            className={`pb-3 text-sm transition-colors relative ${
              abaAtiva === "artilharia"
                ? "text-green-600 border-b-2 border-green-600 font-semibold"
                : "text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
            }`}
          >
            Artilharia
          </button>
        </div>

        {/* 4. Área de Conteúdo das Abas */}
        {abaAtiva === "classificacao" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-lg text-slate-800">Tabela de Classificação</h2>
            <p className="text-sm text-slate-500 mt-1">Pontos corridos com atualização em tempo real.</p>
            <div className="mt-4">
              <TabelaClassificacao dados={classificacaoOrdenada} />
            </div>
          </div>
        )}

        {abaAtiva === "partidas" && (
          <ListaPartida 
            partidas={partidas} 
            onSalvarResultado={atualizarResultadoPartida} 
            jogadores={jogadores}
          />
        )}

        {abaAtiva === "times" && (
          <AbaTimes
            times={times}
            jogadores={jogadores}
            onAdicionarTime={cadastrarTime}
            ligaCheia={podeGerarRodadas}
            onRemoverTime={removerTime}
            setTimeSelecionado={setTimeSelecionado}
          />
        )}

        {abaAtiva === "artilharia" && (
          <TabelaArtilharia
            partidas={partidas}
            jogadores={jogadores}
            times={times}
          />
        )}

        {/* Modal de Elenco */}
        {timeSelecionado && (
          <ModalElenco
            time={timeSelecionado}
            jogadores={jogadores}
            onAdicionarJogador={handleAdicionarJogador}
            onFechar={() => setTimeSelecionado(null)}
            onRemoverJogador={handleRemoverJogador}
          />
        )}

      </main>
    </div>
  );
}