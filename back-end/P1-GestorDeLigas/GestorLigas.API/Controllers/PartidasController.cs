using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace GestorLigas.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PartidasController : ControllerBase
    {
        private readonly NpgsqlDataSource _conexaoBanco;

        public PartidasController(NpgsqlDataSource conexaoBanco)
        {
            _conexaoBanco = conexaoBanco;
        }


        // 1. ROTA GET: BUSCAR TODAS AS PARTIDAS

        [HttpGet]
        public async Task<IActionResult> ObterTodasAsPartidas()
        {
            var listaDePartidas = new List<object>();

            // SELECT para buscar todas as colunas da tabela 'partida'
            // colunas no banco: id_partida, id_time_mandante, id_time_visitante, gols_mandante, gols_visitante, finalizada
            // busca todos com *
            await using var comando = _conexaoBanco.CreateCommand("SELECT id_partida, id_time_mandante, id_time_visitante, gols_mandante, gols_visitante, finalizada FROM partida;");

            await using var leitor = await comando.ExecuteReaderAsync();

            while (await leitor.ReadAsync())
            {
                listaDePartidas.Add(new
                {
                    Id = leitor.GetInt32(0),              // id_partida
                    IdMandante = leitor.GetInt32(1),      // id_time_mandante
                    IdVisitante = leitor.GetInt32(2),     // id_time_visitante
                    GolsMandante = leitor.GetInt32(3),    // gols_mandante
                    GolsVisitante = leitor.GetInt32(4),   // gols_visitante
                    Finalizada = leitor.GetBoolean(5)     // finalizada
                });
            }

            return Ok(listaDePartidas);
        }


        // 2.ROTA POST: CADASTRAR/REGISTRAR UMA PARTIDA

        [HttpPost]
        public async Task<IActionResult> CadastrarPartida([FromBody] PartidaDTO novaPartida)
        {
            // INSERT para a tabela 'partida'
            // colunas: id_time_mandante, id_time_visitante, gols_mandante, gols_visitante, finalizada
            await using var comando = _conexaoBanco.CreateCommand
           ("INSERT INTO partida (id_time_mandante, id_time_visitante, gols_mandante, gols_visitante, finalizada)  VALUES (@idMandante, @idVisitante, @golsMandante, @golsVisitante, @finalizada)");

            // parâmetros ao comando SQL usando o DTO 'novaPartida'
            comando.Parameters.AddWithValue("idMandante", novaPartida.IdTimeMandante);
            comando.Parameters.AddWithValue("idVisitante", novaPartida.IdTimeVisitante);
            comando.Parameters.AddWithValue("golsMandante", novaPartida.GolsMandante);
            comando.Parameters.AddWithValue("golsVisitante", novaPartida.GolsVisitante);
            comando.Parameters.AddWithValue("finalizada", novaPartida.Finalizada);

            // inserção no banco de dados
            await comando.ExecuteNonQueryAsync();

            return Created(string.Empty, novaPartida);
        }
    }

    public class PartidaDTO
    {
        public int IdTimeMandante { get; set; }
        public int IdTimeVisitante { get; set; }
        public int GolsMandante { get; set; }
        public int GolsVisitante { get; set; }
        public bool Finalizada { get; set; } = true;
    }
}