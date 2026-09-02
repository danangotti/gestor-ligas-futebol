using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace RegrasDeNegocioPOO
{
    internal class Jogador
    {
        private string nome, posicao, id;
        private int numerocamisa, golsjog, assjog, partjog;
        
        public Jogador(string nome, string posicao, string id, int numerocamisa)
        {
            this.nome = nome;
            this.posicao = posicao;
            this.id = id;
            this.numerocamisa = numerocamisa;
            this.golsjog = 0;
            this.assjog = 0;
            this.partjog = 0;
        }

        public string Nome
        {
            get { return nome; }
            set { nome = value; }
        }

        public string Posicao
        {
            get { return posicao; }
            set { posicao = value; }
        }

        public string Id
        {
            get { return id; }
            set { id = value; }
        }

        public int NumeroCamisa
        {
            get { return numerocamisa; }
            set { numerocamisa = value; }
        }

        public int GolsJog
        {
            get { return golsjog; }
            set { golsjog = value; }
        }

        public int AssJog
        {
            get { return assjog; }
            set { assjog = value; }
        }

        public int PartJog
        {
            get { return partjog; }
            set { partjog = value; }
        }
    }

    internal class Time
    {
        private List<Jogador> jogadores;
        private string nometime, idtime;
        private int pontos, vitorias, derrotas, empates, golspro, golssofridos;

        public int SaldoGols => GolsPro - Golssofridos;
        //isso de cima "=>"
        //é igual a fazer um metodo get, mas de forma mais enxuta, sem precisar escrever o get e o set
        //public int SaldoGols
        //{
        //get 
        //{ 
        //return Golspro - Golssofridos; 
        //}
        //}

        public Time(string nometime, string idtime)
        {
            this.jogadores = new List<Jogador>();
            this.nometime = nometime;
            this.idtime = idtime;
            this.pontos = 0;
            this.vitorias = 0;
            this.derrotas = 0;
            this.empates = 0;
            this.golspro = 0;
            this.golssofridos = 0;
        }

        public List<Jogador> Jogadores
        {
            get { return jogadores; }
            set { jogadores = value; }
        }

        public string NomeTime
        {
            get { return nometime; }
            set { nometime = value; }
        }

        public string IdTime
        {
            get { return idtime; }
            set { idtime = value; }
        }

        public int Pontos
        {
            get { return pontos; }
            set { pontos = value; }
        }

        public int Vitorias
        {
            get { return vitorias; }
            set { vitorias = value; }
        }

        public int Derrotas
        {
            get { return derrotas; }
            set { derrotas = value; }
        }

        public int Empates
        {
            get { return empates; }
            set { empates = value; }
        }

        public int GolsPro
        {
            get { return golspro; }
            set { golspro = value; }
        }

        public int Golssofridos
        {
            get { return golssofridos; }
            set { golssofridos = value; }
        }

        public void AtualizarEstatisticas(int golsPro, int golsContra)
        {
            golspro += golsPro;
            golssofridos += golsContra;
            if (golsPro > golsContra)
            {
                vitorias++;
                pontos += 3;
            }
            else if (golsPro < golsContra)
            {
                derrotas++;
            }
            else
            {
                empates++;
                pontos += 1;
            }
        }

        public Jogador EncontrarJogadorID(string idJogador)
        {
            for (int i = 0; i < jogadores.Count; i++)
            {
                if (jogadores[i].Id == idJogador)
                {
                    return jogadores[i];
                }
            }
            return null;
        }

        public Jogador EncontrarJogadorNumCamisa(int numCamisa)
        {
            for (int i = 0; i < jogadores.Count; i++)
            {
                if (jogadores[i].NumeroCamisa == numCamisa)
                {
                    return jogadores[i];
                }
            }
            return null;
        }
        public bool RemoverJogador(string idJogador)
        {
            Jogador jogadorParaRemover = EncontrarJogadorID(idJogador);
            if (jogadorParaRemover != null)
            {
                jogadores.Remove(jogadorParaRemover);
                return true; // Remoção bem-sucedida
            }
            return false; // Jogador não encontrado
        }

        public void ExibirJogadores()
        {
            Console.WriteLine($"\n--- JOGADORES DO TIME: {nometime.ToUpper()} ---");
            Console.WriteLine($"{"ID",-10} | {"Nome",-20} | {"Posição",-15} | {"Nº Camisa",-10} | {"Gols",-5} | {"Assistências",-5} | {"Partidas",-5}");
            Console.WriteLine(new string('-', 90));
            foreach (var jogador in jogadores)
            {
                Console.WriteLine($"{jogador.Id,-10} | {jogador.Nome,-20} | {jogador.Posicao,-15} | {jogador.NumeroCamisa,-10} | {jogador.GolsJog,-5} | {jogador.AssJog,-5} | {jogador.PartJog,-5}");
            }
        }
    }

    internal class Partida
    {
        private Time time1, time2;
        private int golsTime1, golsTime2;
        public Partida(Time time1, Time time2)
        {
            this.time1 = time1;
            this.time2 = time2;
            this.golsTime1 = 0;
            this.golsTime2 = 0;
        }
        public Time Time1
        {
            get { return time1; }
            set { time1 = value; }
        }
        public Time Time2
        {
            get { return time2; }
            set { time2 = value; }
        }
        public int GolsTime1
        {
            get { return golsTime1; }
            set { golsTime1 = value; }
        }
        public int GolsTime2
        {
            get { return golsTime2; }
            set { golsTime2 = value; }
        }

        //metodo pra adicionar gol
        //metodos pra fazer tudo da partida, pro metodo final ficar enxuto
        //metodo final tem que chamar um metodo da classe time, que vai atualizar ->
        //os pontos, vitorias, derrotas, empates, golspro e golssofridos

        public void AdicionarGolTime1(Jogador autorgol, Jogador autorassistencia)
        {
            golsTime1++;
            autorgol.GolsJog++;

            if (autorassistencia != null)
            {
                autorassistencia.AssJog++;
            }
        }
        public void AdicionarGolTime2(Jogador autorgol, Jogador autorassistencia)
        {
            golsTime2++;
            autorgol.GolsJog++;

            if (autorassistencia != null)
            {
                autorassistencia.AssJog++;
            }
        }
        public void AdicionarGolContraTime1()
        {
            golsTime2++;
        }
        public void AdicionarGolContraTime2()
        {
            golsTime1++;
        }


        //propriedade para saber o status do jogo, altera para true se tiver finalizado
        public bool StatusPartida { get; private set; } = false;
        public void FinalizarPartida()
        {
            time1.AtualizarEstatisticas(golsTime1, golsTime2);
            time2.AtualizarEstatisticas(golsTime2, golsTime1);
            StatusPartida = true;
        }

        

    }

    internal class Liga
    {
        private string nomeliga, idliga;
        private List<Time> timesparticipantes;
        private List<Partida> partidasrealizadas;

        public Liga(string nomeliga, string idliga)
        {
            this.nomeliga = nomeliga;
            this.idliga = idliga;
            this.timesparticipantes = new List<Time>();
            this.partidasrealizadas = new List<Partida>();
        }

        public string NomeLiga
        {
            get { return nomeliga; }
            set { nomeliga = value; }
        }

        public string IdLiga
        {
            get { return idliga; }
            set { idliga = value; }
        }
        
        public List<Time> TimesParticipantes
        {
            get { return timesparticipantes; }
            set { timesparticipantes = value; }
        }

        public List<Partida> PartidasRealizadas
        {
            get { return partidasrealizadas; }
            set { partidasrealizadas = value; }
        }

        public void AdicionarTime(Time time)
        {
            timesparticipantes.Add(time);
        }

        public void AdicionarPartida(Partida partida)
        {
            partidasrealizadas.Add(partida);
        }

        public Time EncontrarTimeID(string idtime)
        {
            for (int i = 0; i < timesparticipantes.Count; i++)
            {
                if (timesparticipantes[i].IdTime == idtime)
                {
                    return timesparticipantes[i];
                }
            }
            return null;
        }

        public void OrdenarTabela()
        {
            for (int i = 0; i < timesparticipantes.Count; i++)
            {
                for (int j = i + 1; j < timesparticipantes.Count; j++)
                {
                    // 1. O j tem mais pontos?
                    bool trocaPorPontos = timesparticipantes[j].Pontos > timesparticipantes[i].Pontos;

                    // 2. Empatou em pontos, mas o j tem mais vitórias?
                    bool trocaPorVitorias = timesparticipantes[j].Pontos == timesparticipantes[i].Pontos
                                         && timesparticipantes[j].Vitorias > timesparticipantes[i].Vitorias;

                    // 3. Empatou em pontos e vitórias, mas o j tem mais saldo?
                    bool trocaPorSaldo = timesparticipantes[j].Pontos == timesparticipantes[i].Pontos
                                      && timesparticipantes[j].Vitorias == timesparticipantes[i].Vitorias
                                      && timesparticipantes[j].SaldoGols > timesparticipantes[i].SaldoGols;

                    // 4. Empatou em tudo até agora, mas o j tem mais gols pró?
                    bool trocaPorGolsPro = timesparticipantes[j].Pontos == timesparticipantes[i].Pontos
                                        && timesparticipantes[j].Vitorias == timesparticipantes[i].Vitorias
                                        && timesparticipantes[j].SaldoGols == timesparticipantes[i].SaldoGols
                                        && timesparticipantes[j].GolsPro > timesparticipantes[i].GolsPro;

                    if (trocaPorPontos || trocaPorVitorias || trocaPorSaldo || trocaPorGolsPro)
                    {
                        Time temp = timesparticipantes[i];
                        timesparticipantes[i] = timesparticipantes[j];
                        timesparticipantes[j] = temp;
                    }
                }
            }
        }

        public void ExibirTabela()
        {
            OrdenarTabela(); //garante que a tabela esteja ordenada antes de exibir

            Console.WriteLine($"\n--- TABELA DA LIGA: {nomeliga.ToUpper()} ---"); //exibe o nome da liga em maiusculo

            // Definimos larguras fixas para os cabeçalhos (ex: -5 para posição, -15 para nome do time, etc.)
            // o -X define orientação à esquerda e largura de X caracteres,ideal para nomes
            // o X define orientação à direita e largura de X caracteres, ideal para números
            //o numero do x indica a LARGURA EM CARACTERES do campo, e o sinal de menos indica alinhamento à esquerda

            Console.WriteLine($"{"Pos",-4} | {"Time",-15} | {"PTS",-4} | {"V",-3} | {"E",-3} | {"D",-3} | {"GP",-3} | {"GC",-3} | {"SG",-3}");
            Console.WriteLine(new string('-', 65)); // Cria uma linha divisória bonitinha
            for (int i = 0; i < timesparticipantes.Count; i++)
            {
                Time time = timesparticipantes[i];
                // Usamos exatamente as mesmas larguras para os dados ficarem alinhados com o cabeçalho
                Console.WriteLine($"{i + 1,-4} | {time.NomeTime,-15} | {time.Pontos,-4} | {time.Vitorias,-3} | {time.Empates,-3} | {time.Derrotas,-3} | {time.GolsPro,-3} | {time.Golssofridos,-3} | {time.SaldoGols,-3}");
            }
        }

        public void GerarRodadasAutomatica()
        {
            // Limpa partidas antigas se tiver
            partidasrealizadas.Clear();

            //combinar todos os times sem repetição de confrontos
            for (int i = 0; i < timesparticipantes.Count; i++)
            {
                for (int j = i + 1; j < timesparticipantes.Count; j++)
                {
                    //partida entre o time i (mandante) e o time j (visitante)
                    Partida novaPartida = new Partida(timesparticipantes[i], timesparticipantes[j]);

                    //adiciona a partida na lista de partidas da liga
                    partidasrealizadas.Add(novaPartida);
                }
            }

            Console.WriteLine($"\nTabela de jogos gerada com sucesso! Total de {partidasrealizadas.Count} partidas criadas.");
        }

        public void ExibirPartidas()
        {
            Console.WriteLine($"\n--- JOGOS DA LIGA: {nomeliga.ToUpper()} ---");

            for (int i = 0; i < partidasrealizadas.Count; i++)
            {
                //pega a partida atual
                Partida p = partidasrealizadas[i];

                //verifica se o jogo já foi realizado, se sim, exibe o placar, se não, exibe "vs"
                string status = p.StatusPartida ? $"{p.GolsTime1} x {p.GolsTime2}" : "vs";

                Console.WriteLine($"Rodada {i + 1}: {p.Time1.NomeTime} {status} {p.Time2.NomeTime}");
            }
        }
    }
    internal class Program
    {
        // O método BuscarLigaPorId pode ficar aqui caso no futuro você queira gerenciar múltiplas ligas.
        public static Liga BuscarLigaPorId(string idProcurado, List<Liga> ligas)
        {
            foreach (Liga liga in ligas)
            {
                if (liga.IdLiga == idProcurado)
                {
                    return liga;
                }
            }
            return null;
        }

        static void Main(string[] args)
        {
            // === CONFIGURAÇÃO DA LIGA ATIVA (SESSÃO) ===
            Console.WriteLine("========================================");
            Console.WriteLine("        BEM-VINDO AO GESTOR DE LIGAS    ");
            Console.WriteLine("========================================");
            Console.WriteLine("Para começar, precisamos criar a sua Liga.");
            Console.WriteLine("Informe o nome da Liga:");
            string nomeLigaAtiva = Console.ReadLine();
            Console.WriteLine("Informe o ID da Liga:");
            string idLigaAtiva = Console.ReadLine();

            // Instancia a liga que será usada em todo o programa
            Liga ligaAtual = new Liga(nomeLigaAtiva, idLigaAtiva);

            // Opcional: Adicionar a uma lista global caso queira expandir depois
            List<Liga> ligas = new List<Liga>();
            ligas.Add(ligaAtual);

            int opcao;
            do
            {
                Console.WriteLine("\n========================================");
                // O menu agora mostra o nome da liga ativa!
                Console.WriteLine($"   PAINEL DA LIGA: {ligaAtual.NomeLiga.ToUpper()}");
                Console.WriteLine("========================================");
                Console.WriteLine("0. Gerar Tabela de Jogos");
                Console.WriteLine("1. Cadastrar Novo Time");
                Console.WriteLine("2. Registrar Resultado de Partida");
                Console.WriteLine("3. Exibir Tabela de Classificação");
                Console.WriteLine("4. Gerenciar Time");
                Console.WriteLine("5. Sair");

                Console.WriteLine("========================================");
                Console.Write("Escolha uma opção: ");

                opcao = int.Parse(Console.ReadLine());
                switch (opcao)
                {
                    case 0:
                        Console.WriteLine("\n--- GERAR TABELA DE JOGOS ---");

                        // Verifica se há pelo menos 2 times cadastrados na liga
                        if (ligaAtual.TimesParticipantes.Count < 2)
                        {
                            Console.WriteLine("É necessário ter pelo menos 2 times cadastrados para gerar os jogos!");
                            break;
                        }

                        // Gera as partidas usando a lógica de Round-Robin
                        ligaAtual.GerarRodadasAutomatica();

                        // Exibe a lista de jogos recém-criados
                        ligaAtual.ExibirPartidas();
                        break;

                    case 1:
                        Console.WriteLine("\n--- CADASTRAR NOVO TIME ---");
                        Console.WriteLine("Informe o nome do time");
                        string nometime = Console.ReadLine();
                        Console.WriteLine("Informe o ID do time");
                        string idtime = Console.ReadLine();

                        Time t = new Time(nometime, idtime);

                        // Adiciona direto na liga atual, sem perguntar o ID da liga
                        ligaAtual.TimesParticipantes.Add(t);
                        Console.WriteLine("Time cadastrado com Sucesso!");
                        break;

                    case 2:
                        Console.WriteLine("\n--- REGISTRAR RESULTADO DE PARTIDA ---");

                        // 1. Verifica se existem partidas geradas na liga
                        if (ligaAtual.PartidasRealizadas.Count == 0)
                        {
                            Console.WriteLine("Nenhuma partida foi gerada ainda! Gere a tabela de jogos antes de registrar um resultado.");
                            break;
                        }

                        // 2. Exibe as partidas para o usuário escolher pelo número
                        ligaAtual.ExibirPartidas();

                        Console.Write("\nDigite o número da rodada que deseja registrar: ");
                        int numJogo = int.Parse(Console.ReadLine());

                        //ve se o numero da rodada é válido, se não for, avisa e sai do case
                        if (numJogo < 1 || numJogo > ligaAtual.PartidasRealizadas.Count)
                        {
                            Console.WriteLine("Número de rodada inválido.");
                            break;
                        }

                        // 3.pega a partida e seus times
                        //a rodada 1, é referente ao indice 0 da lista, por isso subtrai 1
                        Partida partida = ligaAtual.PartidasRealizadas[numJogo - 1];

                        if (partida.StatusPartida)
                        {
                            Console.WriteLine("Esta partida já foi finalizada anteriormente!");
                            break;
                        }

                        Time timeMandante = partida.Time1;
                        Time timeVisitante = partida.Time2;

                        Console.WriteLine($"\nRegistrando: {timeMandante.NomeTime} vs {timeVisitante.NomeTime}");

                        Console.WriteLine("Informe a quantidade de gols do time mandante:");
                        int golsMandante = int.Parse(Console.ReadLine());

                        Console.WriteLine("Informe a quantidade de gols do time visitante:");
                        int golsVisitante = int.Parse(Console.ReadLine());

                        if (golsMandante > 0)
                        {
                            Console.WriteLine("\n--- GOLS DO TIME MANDANTE ---");

                            for (int i = 0; i < golsMandante; i++)
                            {
                                Console.WriteLine($"\n[GOL {i + 1} DE {golsMandante}]");
                                timeMandante.ExibirJogadores();
                                Console.WriteLine("0. GOL CONTRA");
                                Console.Write("Digite o número da camisa do jogador que marcou o gol: ");
                                int numcamisa = int.Parse(Console.ReadLine());

                                if (numcamisa == 0)
                                {
                                    partida.AdicionarGolContraTime1();
                                    Console.WriteLine("Gol contra registrado para o adversário!");
                                }
                                else
                                {
                                    // 1. Encontra e guarda o autor do gol
                                    Jogador autorGol = timeMandante.EncontrarJogadorNumCamisa(numcamisa);

                                    if (autorGol == null)
                                    {
                                        Console.WriteLine("Jogador não encontrado com esse número de camisa! Tente novamente.");
                                        i--; // Repete a iteração para o mesmo gol
                                        continue;
                                    }

                                    // 2. Pergunta sobre a assistência
                                    Console.Write("O gol teve assistência? (1 - Sim / 0 - Não): ");
                                    int teveAssistencia = int.Parse(Console.ReadLine());

                                    if (teveAssistencia == 1)
                                    {
                                        Console.Write("Digite o número da camisa do autor da assistência: ");
                                        int camisaAss = int.Parse(Console.ReadLine());
                                        Jogador autorAssistencia = timeMandante.EncontrarJogadorNumCamisa(camisaAss);

                                        // Registra com autor e assistência
                                        partida.AdicionarGolTime1(autorGol, autorAssistencia);
                                    }
                                    else
                                    {
                                        // Registra sem assistência
                                        partida.AdicionarGolTime1(autorGol, null);
                                    }

                                    Console.WriteLine($"Gol de {autorGol.Nome} registrado com sucesso!");
                                }
                            }
                        }

                        if (golsVisitante > 0)
                        {
                            Console.WriteLine("\n--- GOLS DO TIME VISITANTE ---");

                            for (int i = 0; i < golsVisitante; i++)
                            {
                                Console.WriteLine($"\n[GOL {i + 1} DE {golsVisitante}]");
                                timeVisitante.ExibirJogadores();
                                Console.WriteLine("0. GOL CONTRA");
                                Console.Write("Digite o número da camisa do jogador que marcou o gol: ");
                                int numcamisa = int.Parse(Console.ReadLine());

                                if (numcamisa == 0)
                                {
                                    partida.AdicionarGolContraTime2();
                                    Console.WriteLine("Gol contra registrado para o mandante!");
                                }
                                else
                                {
                                    // 1. Encontra e guarda o autor do gol
                                    Jogador autorGol = timeVisitante.EncontrarJogadorNumCamisa(numcamisa);

                                    if (autorGol == null)
                                    {
                                        Console.WriteLine("Jogador não encontrado com esse número de camisa! Tente novamente.");
                                        i--; // Repete a iteração para o mesmo gol
                                        continue;
                                    }

                                    // 2. Pergunta sobre a assistência
                                    Console.Write("O gol teve assistência? (1 - Sim / 0 - Não): ");
                                    int teveAssistencia = int.Parse(Console.ReadLine());

                                    if (teveAssistencia == 1)
                                    {
                                        Console.Write("Digite o número da camisa do autor da assistência: ");
                                        int camisaAss = int.Parse(Console.ReadLine());
                                        Jogador autorAssistencia = timeVisitante.EncontrarJogadorNumCamisa(camisaAss);

                                        // Registra com autor e assistência
                                        partida.AdicionarGolTime2(autorGol, autorAssistencia);
                                    }
                                    else
                                    {
                                        // Registra sem assistência
                                        partida.AdicionarGolTime2(autorGol, null);
                                    }

                                    Console.WriteLine($"Gol de {autorGol.Nome} registrado com sucesso!");
                                }
                            }
                        }

                        partida.FinalizarPartida();
                        Console.WriteLine("Partida registrada e tabela atualizada com sucesso!");
                        break;

                    case 3:
                        Console.WriteLine();
                        // EXIBIR TABELA DE CLASSIFICAÇÃO (Exibe direto da liga atual)
                        ligaAtual.ExibirTabela();
                        break;

                    case 4:
                        Console.WriteLine("\n--- GERENCIAR TIME ---");
                        Console.WriteLine("Informe o ID do time que deseja gerenciar");
                        string idTimeGerenciar = Console.ReadLine();

                        Time timeParaGerenciar = ligaAtual.EncontrarTimeID(idTimeGerenciar);

                        if (timeParaGerenciar == null)
                        {
                            Console.WriteLine("Time não encontrado na liga atual.");
                            break;
                        }

                        Console.WriteLine($"Acessando o painel de gerenciamento do time: {timeParaGerenciar.NomeTime}");

                        int subOpcao;

                        do
                        {
                            Console.WriteLine("========================================");
                            Console.WriteLine($"   GERENCIAR TIME: {timeParaGerenciar.NomeTime.ToLower()}");
                            Console.WriteLine("========================================");

                            Console.WriteLine("1. Adicionar Jogador");
                            Console.WriteLine("2. Remover Jogador");
                            Console.WriteLine("3. Exibir Jogadores");
                            Console.WriteLine("4. Voltar");

                            Console.WriteLine("========================================");
                            Console.Write("Escolha uma opção: ");

                            subOpcao = int.Parse(Console.ReadLine());

                            switch (subOpcao)
                            {
                                case 1:
                                    //pedir os dados do jogador
                                    Console.WriteLine("Informe o nome do jogador:");
                                    string nomeJogador = Console.ReadLine();
                                    Console.WriteLine("Informe o id do jogador:");
                                    string idJogador = Console.ReadLine();
                                    Console.WriteLine("Informe a posição do jogador:");
                                    string posicaoJogador = Console.ReadLine();
                                    Console.WriteLine("Informe o número da camisa do jogador:");
                                    int numeroCamisa = int.Parse(Console.ReadLine());

                                    //criar o jogador
                                    Jogador jog = new Jogador(nomeJogador, posicaoJogador, idJogador, numeroCamisa);

                                    //adicionar o jogador ao time
                                    timeParaGerenciar.Jogadores.Add(jog);

                                    Console.WriteLine("Jogador adicionado com sucesso!");

                                    break;
                                case 2:
                                    //pedir id do jogador a ser removido
                                    Console.WriteLine("Informe o id do jogador a ser removido:");
                                    string idJogadorRemover = Console.ReadLine();

                                    //remover o jogador do time
                                    bool remover = timeParaGerenciar.RemoverJogador(idJogadorRemover);
                                    if (remover)
                                    {
                                        Console.WriteLine("Jogador removido com sucesso!");
                                    }
                                    else
                                    {
                                        Console.WriteLine("Jogador não encontrado.");
                                    }
                                    break;
                                case 3:
                                    timeParaGerenciar.ExibirJogadores();
                                    break;
                                case 4:
                                    Console.WriteLine("Voltando ao menu principal...");
                                    break;
                                default:
                                    Console.WriteLine("Opção inválida. Tente novamente.");
                                    break;
                            }

                        } while (subOpcao != 4);

                        break;

                    case 5:
                        Console.WriteLine("Encerrando o sistema...");
                        break;

                    default:
                        Console.WriteLine("Opção inválida. Tente novamente.");
                        break;
                }

            } while (opcao != 5);
        }
    }
}
