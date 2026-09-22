import { useParams, Link } from "react-router-dom";
import { HeaderDashbord } from "../components/HeaderDashbord";
import { useState } from "react";
import { TabelaClassificacao } from "../components/TabelaClassificacao";
import { ListaPartida } from "../components/ListaPartida";
import { AbaTimes } from "../components/AbaTimes";
import { ModalElenco } from "../components/ModalElenco";
import { TabelaArtilharia } from "../components/TabelaArtilharia";
import { ligasIniciais } from "../dados/dadosIniciais";
import { ChaveamentoMataMata } from "../components/ChaveamentoMataMata";

export default function PaginaGerenciarLiga() {
  const { id } = useParams();

  // 1. Busca primeiro nas ligas salvas no navegador; se não houver, usa a lista inicial
  const ligasSalvas = localStorage.getItem("ligas_cadastradas");
  const todasAsLigas = ligasSalvas ? JSON.parse(ligasSalvas) : ligasIniciais;

  const ligaAtual = todasAsLigas.find((l) => l.id === Number(id));

  // 2. Guarda de segurança para rotas inexistentes
  if (!ligaAtual) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-2xl mb-4 font-bold">
          !
        </div>
        <h2 className="text-xl font-bold text-slate-800">
          Liga não encontrada
        </h2>
        <p className="text-slate-500 text-sm mt-1 mb-6 max-w-sm">
          A competição solicitada não existe ou foi removida do sistema.
        </p>
        <Link
          to="/dashbord"
          className="text-sm font-semibold text-white bg-green-600 hover:bg-green-700 px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-green-600/20"
        >
          Voltar para o Dashboard
        </Link>
      </div>
    );
  }

  const isMataMata = ligaAtual.formato === "Mata-Mata";
  const totalTimeEsperados = ligaAtual.quantidadeTimes;

  // Estados principais da liga
  const [partidas, setPartidas] = useState(ligaAtual.partidas || []);
  const [abaAtiva, setAbaAtiva] = useState(
    isMataMata ? "partidas" : "classificacao",
  );
  const [timeSelecionado, setTimeSelecionado] = useState(null);
  const [times, setTimes] = useState(ligaAtual.times || []);
  const [classificacao, setClassificacao] = useState(() =>
    calcularClassificacao(ligaAtual.times || [], ligaAtual.partidas || []),
  );
  const [jogadores, setJogadores] = useState(ligaAtual.jogadores || []);

  function salvarDadosDaLiga(novosTimes, novasPartidas, novosJogadores) {
    const ligasSalvas = localStorage.getItem("ligas_cadastradas");
    const todasAsLigas = ligasSalvas ? JSON.parse(ligasSalvas) : ligasIniciais;

    const ligasAtualizadas = todasAsLigas.map((liga) => {
      if (liga.id === ligaAtual.id) {
        return {
          ...liga,
          times: novosTimes,
          partidas: novasPartidas,
          jogadores: novosJogadores,
        };
      }
      return liga;
    });

    localStorage.setItem("ligas_cadastradas", JSON.stringify(ligasAtualizadas));
  }

  const podeGerarRodadas = times.length === totalTimeEsperados;

  function handleAdicionarJogador(novoJogador) {
    const novos = [...jogadores, novoJogador];
    setJogadores(novos);
    salvarDadosDaLiga(times, partidas, novos);
  }

  function handleRemoverJogador(idJogadorParaRemover) {
    const novos = jogadores.filter(
      (jogador) => jogador.id !== idJogadorParaRemover,
    );
    setJogadores(novos);
    salvarDadosDaLiga(times, partidas, novos);
  }

  function obterNomeFasePorJogos(quantidadeJogos) {
    const nomesFases = {
      16: "16 avos de final",
      8: "Oitavas de Final",
      4: "Quartas de Final",
      2: "Semifinal",
      1: "Final",
    };
    return (
      nomesFases[quantidadeJogos] ||
      `Fase eliminatória (${quantidadeJogos} jogos)`
    );
  }

  function gerarEstruturaMataMata(listaTimes) {
    const novasPartidas = [];
    let contadorId = 1;
    const totalEquipes = listaTimes.length;

    const jogosIniciais = totalEquipes / 2;
    const nomeFaseAtual = obterNomeFasePorJogos(jogosIniciais);
    const jogosPrimeiraFase = [];

    for (let i = 0; i < totalEquipes; i += 2) {
      const jogo = {
        id: contadorId,
        fase: nomeFaseAtual,
        idMandante: listaTimes[i].id,
        nomeMandante: listaTimes[i].nome,
        idVisitante: listaTimes[i + 1].id,
        nomeVisitante: listaTimes[i + 1].nome,
        golsMandante: 0,
        golsVisitante: 0,
        penaltisMandante: null,
        penaltisVisitante: null,
        finalizada: false,
        vencedorId: null,
        autoresGols: [],
      };
      novasPartidas.push(jogo);
      jogosPrimeiraFase.push(jogo);
      contadorId++;
    }

    let jogosFaseAnterior = jogosPrimeiraFase;
    while (jogosFaseAnterior.length > 1) {
      const totalJogosProximaFase = jogosFaseAnterior.length / 2;
      const proximoNomeFase = obterNomeFasePorJogos(totalJogosProximaFase);
      const jogosNovaFase = [];

      for (let i = 0; i < totalJogosProximaFase; i++) {
        const novoJogo = {
          id: contadorId,
          fase: proximoNomeFase,
          idMandante: null,
          nomeMandante: "A definir",
          idVisitante: null,
          nomeVisitante: "A definir",
          golsMandante: 0,
          golsVisitante: 0,
          penaltisMandante: null,
          penaltisVisitante: null,
          finalizada: false,
          vencedorId: null,
          autoresGols: [],
        };

        jogosFaseAnterior[i * 2].proximoJogoId = novoJogo.id;
        jogosFaseAnterior[i * 2].posicaoProximoJogo = "mandante";

        jogosFaseAnterior[i * 2 + 1].proximoJogoId = novoJogo.id;
        jogosFaseAnterior[i * 2 + 1].posicaoProximoJogo = "visitante";

        novasPartidas.push(novoJogo);
        jogosNovaFase.push(novoJogo);
        contadorId++;
      }
      jogosFaseAnterior = jogosNovaFase;
    }

    return novasPartidas;
  }

  function gerarPartidas() {
    if (!podeGerarRodadas) return;

    if (isMataMata) {
      const partidasMataMata = gerarEstruturaMataMata(times);
      setPartidas(partidasMataMata);
      salvarDadosDaLiga(times, partidasMataMata, jogadores);
      return;
    }

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
    salvarDadosDaLiga(times, novasPartidas, jogadores);
  }

  function calcularClassificacao(listaTimes, listaPartidas) {
    const tabelaBase = listaTimes.map((time) => ({
      idTime: time.id,
      nomeTime: time.nome,
      jogos: 0,
      pontos: 0,
      vitorias: 0,
      empates: 0,
      derrotas: 0,
      golsPro: 0,
      golsSofridos: 0,
    }));

    listaPartidas.forEach((partida) => {
      if (!partida.finalizada) return;

      const mandante = tabelaBase.find((t) => t.idTime === partida.idMandante);
      const visitante = tabelaBase.find(
        (t) => t.idTime === partida.idVisitante,
      );
      if (!mandante || !visitante) return;

      mandante.jogos += 1;
      visitante.jogos += 1;
      mandante.golsPro += partida.golsMandante;
      mandante.golsSofridos += partida.golsVisitante;
      visitante.golsPro += partida.golsVisitante;
      visitante.golsSofridos += partida.golsMandante;

      if (partida.golsMandante > partida.golsVisitante) {
        mandante.pontos += 3;
        mandante.vitorias += 1;
        visitante.derrotas += 1;
      } else if (partida.golsMandante < partida.golsVisitante) {
        visitante.pontos += 3;
        visitante.vitorias += 1;
        mandante.derrotas += 1;
      } else {
        mandante.pontos += 1;
        mandante.empates += 1;
        visitante.pontos += 1;
        visitante.empates += 1;
      }
    });

    return tabelaBase;
  }

  function atualizarResultadoPartida(
    idPartida,
    golsMandante,
    golsVisitante,
    autoresGols = [],
    penaltisMandante = null,
    penaltisVisitante = null,
  ) {
    const golsMandanteNum = Number(golsMandante);
    const golsVisitanteNum = Number(golsVisitante);
    const partidaAtual = partidas.find((p) => p.id === idPartida);
    if (!partidaAtual) return;

    let vencedorId = null;
    let vencedorNome = "";

    if (isMataMata) {
      if (golsMandanteNum > golsVisitanteNum) {
        vencedorId = partidaAtual.idMandante;
        vencedorNome = partidaAtual.nomeMandante;
      } else if (golsVisitanteNum > golsMandanteNum) {
        vencedorId = partidaAtual.idVisitante;
        vencedorNome = partidaAtual.nomeVisitante;
      } else {
        const penMandanteNum = Number(penaltisMandante);
        const penVisitanteNum = Number(penaltisVisitante);

        if (penMandanteNum > penVisitanteNum) {
          vencedorId = partidaAtual.idMandante;
          vencedorNome = partidaAtual.nomeMandante;
        } else if (penVisitanteNum > penMandanteNum) {
          vencedorId = partidaAtual.idVisitante;
          vencedorNome = partidaAtual.nomeVisitante;
        } else {
          alert("A disputa de pênaltis precisa ter um vencedor!");
          return;
        }
      }
    }

    const partidasAtualizadas = partidas.map((partida) => {
      if (partida.id === idPartida) {
        return {
          ...partida,
          golsMandante: golsMandanteNum,
          golsVisitante: golsVisitanteNum,
          autoresGols: autoresGols,
          penaltisMandante:
            penaltisMandante !== null ? Number(penaltisMandante) : null,
          penaltisVisitante:
            penaltisVisitante !== null ? Number(penaltisVisitante) : null,
          finalizada: true,
          vencedorId: vencedorId,
        };
      }

      if (isMataMata && partida.id === partidaAtual.proximoJogoId) {
        if (partidaAtual.posicaoProximoJogo === "mandante") {
          return {
            ...partida,
            idMandante: vencedorId,
            nomeMandante: vencedorNome,
          };
        } else {
          return {
            ...partida,
            idVisitante: vencedorId,
            nomeVisitante: vencedorNome,
          };
        }
      }

      return partida;
    });

    setPartidas(partidasAtualizadas);
    salvarDadosDaLiga(times, partidasAtualizadas, jogadores);

    if (!isMataMata) {
      const novaClassificacao = calcularClassificacao(
        times,
        partidasAtualizadas,
      );
      setClassificacao(novaClassificacao);
    }
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

    const novosTimes = [...times, novoClube];
    setTimes(novosTimes);

    if (!isMataMata) {
      const novaClassificacao = calcularClassificacao(novosTimes, partidas);
      setClassificacao(novaClassificacao);
    }

    salvarDadosDaLiga(novosTimes, partidas, jogadores);
  }

  function removerTime(idParaRemover) {
    const timesFiltrados = times.filter((time) => time.id !== idParaRemover);
    setTimes(timesFiltrados);

    const jogadoresFiltrados = jogadores.filter(
      (atleta) => atleta.idTime !== idParaRemover,
    );
    setJogadores(jogadoresFiltrados);

    const partidasFiltradas = partidas.filter(
      (partida) =>
        partida.idMandante !== idParaRemover &&
        partida.idVisitante !== idParaRemover,
    );
    setPartidas(partidasFiltradas);

    if (!isMataMata) {
      const novaClassificacao = calcularClassificacao(
        timesFiltrados,
        partidasFiltradas,
      );
      setClassificacao(novaClassificacao);
    }

    salvarDadosDaLiga(timesFiltrados, partidasFiltradas, jogadoresFiltrados);
  }

  const classificacaoOrdenada = [...classificacao].sort((timeA, timeB) => {
    if (timeB.pontos === timeA.pontos) {
      const saldoA = timeA.golsPro - timeA.golsSofridos;
      const saldoB = timeB.golsPro - timeB.golsSofridos;
      if (saldoA === saldoB) return timeB.golsPro - timeA.golsPro;
      return saldoB - saldoA;
    }
    return timeB.pontos - timeA.pontos;
  });

  let statusCompeticao = "Em andamento";
  if (partidas.length === 0) {
    statusCompeticao = "Não iniciada";
  } else if (partidas.every((p) => p.finalizada)) {
    statusCompeticao = "Finalizada";
  }

  const liderAtual =
    classificacaoOrdenada.length > 0 ? classificacaoOrdenada[0] : null;
  const partidasFinalizadas = partidas.filter((p) => p.finalizada).length;
  const totalGolsLiga = partidas.reduce((acumulador, p) => {
    if (p.finalizada) {
      return acumulador + p.golsMandante + p.golsVisitante;
    }
    return acumulador;
  }, 0);

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 pb-16">
      <HeaderDashbord />

      <main className="max-w-6xl mx-auto p-4 sm:p-8">
        {/* Link de Retorno */}
        <Link
          to="/dashbord"
          className="group inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-green-600 transition-colors mb-6"
        >
          <span className="p-1 rounded-md bg-white border border-slate-200 group-hover:border-green-300">
            ←
          </span>
          Voltar para Minhas Ligas
        </Link>

        {/* 1. Header do Campeonato */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-700 bg-green-50 border border-green-200/60 px-3 py-1 rounded-full">
                ID #{ligaAtual.id}
              </span>
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200/70 px-3 py-1 rounded-full">
                {ligaAtual.formato}
              </span>
              <span
                className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${
                  statusCompeticao === "Finalizada"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : statusCompeticao === "Em andamento"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                }`}
              >
                ● {statusCompeticao}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {ligaAtual.nome}
            </h1>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              {isMataMata
                ? "Acompanhe as fases eliminatórias, confrontos diretos e o chaveamento até a grande final."
                : "Gerencie a tabela de classificação, os times participantes e as rodadas da liga."}
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:items-end gap-3 bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-2xl border md:border-0 border-slate-200/80">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">
                Clubes inscritos:
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  podeGerarRodadas
                    ? "bg-green-100 text-green-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {times.length} / {totalTimeEsperados}
              </span>
            </div>

            {abaAtiva === "partidas" && (
              <button
                type="button"
                disabled={
                  !podeGerarRodadas || statusCompeticao !== "Não iniciada"
                }
                onClick={gerarPartidas}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm ${
                  podeGerarRodadas && statusCompeticao === "Não iniciada"
                    ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer active:scale-95 shadow-green-600/25"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                }`}
              >
                {isMataMata ? "Gerar Chaveamento" : "Gerar Tabela de Jogos"}
              </button>
            )}
          </div>
        </div>

        {/* 2. Cards de Métricas Principais */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">
                Clubes
              </span>
              <span>🛡️</span>
            </div>
            <p className="text-2xl font-black text-slate-900 mt-2">
              {times.length}
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">
                Jogos Concluídos
              </span>
              <span>📅</span>
            </div>
            <div className="flex items-baseline gap-1 mt-2">
              <p className="text-2xl font-black text-slate-900">
                {partidasFinalizadas}
              </p>
              <span className="text-xs text-slate-400 font-semibold">
                / {partidas.length}
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">
                Gols Marcados
              </span>
              <span>⚽</span>
            </div>
            <p className="text-2xl font-black text-green-700 mt-2">
              {totalGolsLiga}
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">
                {isMataMata ? "Status Mata-Mata" : "Líder Atual"}
              </span>
              <span>🏆</span>
            </div>
            <p className="text-sm font-black text-slate-800 mt-2 truncate">
              {isMataMata
                ? partidas.find((p) => p.fase === "Final" && p.finalizada)
                  ? "Campeão Definido"
                  : "Chaveamento Aberto"
                : liderAtual && liderAtual.jogos > 0
                  ? liderAtual.nomeTime
                  : "Aguardando início"}
            </p>
          </div>
        </div>

        {/* 3. Navegação Moderna por Abas */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-200/60 rounded-2xl mb-8 overflow-x-auto w-fit">
          {!isMataMata && (
            <button
              type="button"
              onClick={() => setAbaAtiva("classificacao")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                abaAtiva === "classificacao"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Classificação
            </button>
          )}

          <button
            type="button"
            onClick={() => setAbaAtiva("partidas")}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              abaAtiva === "partidas"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {isMataMata ? "Chaveamento" : "Partidas"}
          </button>

          <button
            type="button"
            onClick={() => setAbaAtiva("times")}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              abaAtiva === "times"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Times ({times.length})
          </button>

          <button
            type="button"
            onClick={() => setAbaAtiva("artilharia")}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              abaAtiva === "artilharia"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Artilharia
          </button>
        </div>

        {/* 4. Área de Conteúdo */}
        {!isMataMata && abaAtiva === "classificacao" && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
            <div className="mb-4">
              <h2 className="font-extrabold text-base text-slate-900">
                Tabela de Classificação
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Pontos corridos atualizados em tempo real conforme os jogos são
                lançados.
              </p>
            </div>
            <TabelaClassificacao dados={classificacaoOrdenada} />
          </div>
        )}

        {abaAtiva === "partidas" &&
          (isMataMata ? (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
              <ChaveamentoMataMata
                partidas={partidas}
                onSalvarResultado={atualizarResultadoPartida}
                jogadores={jogadores}
              />
            </div>
          ) : (
            <ListaPartida
              partidas={partidas}
              onSalvarResultado={atualizarResultadoPartida}
              jogadores={jogadores}
            />
          ))}

        {abaAtiva === "times" && (
          <AbaTimes
            times={times}
            jogadores={jogadores}
            onAdicionarTime={cadastrarTime}
            ligaCheia={podeGerarRodadas}
            onRemoverTime={removerTime}
            setTimeSelecionado={setTimeSelecionado}
            statusCompeticao={statusCompeticao}
          />
        )}

        {abaAtiva === "artilharia" && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
            <TabelaArtilharia
              partidas={partidas}
              jogadores={jogadores}
              times={times}
            />
          </div>
        )}

        {/* Modal de Elenco */}
        {timeSelecionado && (
          <ModalElenco
            time={timeSelecionado}
            jogadores={jogadores}
            onAdicionarJogador={handleAdicionarJogador}
            onFechar={() => setTimeSelecionado(null)}
            onRemoverJogador={handleRemoverJogador}
            statusCompeticao={statusCompeticao}
          />
        )}
      </main>
    </div>
  );
}
