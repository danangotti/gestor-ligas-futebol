using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace GestorLigas.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClassificacaoController : ControllerBase
    {
        private readonly NpgsqlDataSource _conexaoBanco;

        public ClassificacaoController(NpgsqlDataSource conexaoBanco)
        {
            _conexaoBanco = conexaoBanco;
        }

        // ROTA GET: CALCULAR E RETORNAR A TABELA DE CLASSIFICAÇÃO
        [HttpGet]
        public async Task<IActionResult> ObterTabelaClassificacao()
        {
            // 1. Busca todos os times do banco de dados

            var listaTimes = new List<TabelaItemDTO>();
            await using var cmdTimes = _conexaoBanco.CreateCommand
                ("SELECT id_time, nome_time FROM time;");

            //cmdtimes -> comando que vai executar a query no banco de dados
            await using (var leitor = await cmdTimes.ExecuteReaderAsync())
            {
                // leitura de cada linha do resultado da query
                while (await leitor.ReadAsync())
                {
                    listaTimes.Add(new TabelaItemDTO
                    {
                        IdTime = leitor.GetInt32(0),
                        NomeTime = leitor.GetString(1)
                    });
                }
            }

            // 2. Busca todas as partidas que JÁ FORAM FINALIZADAS -> WHERE FINALIZADA = TRUE
            //cmdPartidas -> comando que vai executar a query no banco de dados
            await using var cmdPartidas = _conexaoBanco.CreateCommand
                ("SELECT id_time_mandante, id_time_visitante, gols_mandante, gols_visitante FROM partida WHERE finalizada = true;");

            
            await using (var leitor = await cmdPartidas.ExecuteReaderAsync())
            {
                // leitura de cada linha do resultado da query
                while (await leitor.ReadAsync())
                {
                    int idMandante = leitor.GetInt32(0);
                    int idVisitante = leitor.GetInt32(1);
                    int golsMandante = leitor.GetInt32(2);
                    int golsVisitante = leitor.GetInt32(3);

                    // Localiza os objetos do Mandante e do Visitante na lista em memória


                    //LINQ (OrderByDescending, ThenByDescending, FirstOrDefault) -> metodos de consulta integrada do c# pra manipular as lists
                    //firstordefault -> retorna o primeiro elemento da lista que atende a condição, ou null se não encontrar
                    //orderbydescending -> ordena a lista em ordem decrescente com base na propriedade especificada
                    //thenbydescending -> ordena a lista em ordem decrescente, mas so quando tem empate na propriedade anterior


                    var mandante = listaTimes.FirstOrDefault(t => t.IdTime == idMandante);
                    var visitante = listaTimes.FirstOrDefault(t => t.IdTime == idVisitante);

                    //se os dois não forem null -> se os dois times existem na lista, então atualiza os dados de cada time
                    if (mandante != null && visitante != null)
                    {
                        // soma Gols Pró e Sofridos
                        mandante.GolsPro += golsMandante;
                        mandante.GolsSofridos += golsVisitante;
                        visitante.GolsPro += golsVisitante;
                        visitante.GolsSofridos += golsMandante;

                        // REGRA DE PONTUAÇÃO (Vitória, Empate, Derrota)
                        // Se golsMandante > golsVisitante: Mandante ganha 3 pts e 1 vitória | Visitante 1 derrota
                        // Se golsVisitante > golsMandante: Visitante ganha 3 pts e 1 vitória | Mandante 1 derrota
                        // Se forem iguais: Ambos ganham 1 pt e 1 empate
                        if (golsMandante > golsVisitante)
                        {
                            mandante.Pontos += 3;
                            mandante.Vitorias += 1;
                            visitante.Derrotas += 1;
                        }
                        else if (golsVisitante > golsMandante)
                        {
                            visitante.Pontos += 3;
                            visitante.Vitorias += 1;
                            mandante.Derrotas += 1;
                        }
                        else
                        {
                            mandante.Pontos += 1;
                            mandante.Empates += 1;
                            visitante.Pontos += 1;
                            visitante.Empates += 1;
                        }
                    }
                }
            }

            // 3. Ordena a tabela aplicando o seu algoritmo (Pontos -> Vitórias -> Saldo de Gols -> Gols Pró)
            var tabelaOrdenada = listaTimes
                //obd -> order by descending (ordena em ordem decrescente)
                //tbd -> then by descending (ordena em ordem decrescente, mas so quando tem empate na propriedade anterior)

                .OrderByDescending(t => t.Pontos)
                .ThenByDescending(t => t.Vitorias)
                .ThenByDescending(t => t.SaldoGols)
                .ThenByDescending(t => t.GolsPro)
                .ToList();

            return Ok(tabelaOrdenada);
        }
    }

    // DTO que representa cada linha da Tabela de Classificação
    public class TabelaItemDTO
    {
        public int IdTime { get; set; }
        public string NomeTime { get; set; }
        public int Pontos { get; set; }
        public int Vitorias { get; set; }
        public int Empates { get; set; }
        public int Derrotas { get; set; }
        public int GolsPro { get; set; }
        public int GolsSofridos { get; set; }
        public int SaldoGols => GolsPro - GolsSofridos;
    }
}