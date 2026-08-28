using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace GestorLigas.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TimesController : ControllerBase
    {
        private readonly NpgsqlDataSource _dataSource;

        // Injeção de Dependência: O .NET entrega a conexão configurada no Program.cs
        public TimesController(NpgsqlDataSource dataSource)
        {
            _dataSource = dataSource;
        }

        // GET: api/times -> consultar api dos times
        [HttpGet] //define que o método ObterTodosOsTimes() so funciona quando a rota api/times for acessada via GET
        public async Task<IActionResult> ObterTodosOsTimes() //define que é assíncrono (função de programação que executa uma tarefa demorada em segundo plano) e retorna um IActionResult
        {
            var times = new List<object>();

            // Abre a conexão com o PostgreSQL

            //createcommand () cria um comando SQL para ser executado no banco de dados
            await using var comando = _dataSource.CreateCommand("SELECT id_time, nome_time, cidade FROM time;");

            // ExecuteReaderAsync() executa o comando SQL e retorna um leitor de dados (reader) para ler os resultados
            await using var leitor = await comando.ExecuteReaderAsync();

            //await using é usado para garantir que o c# feche a conexao imediatamente após o uso, pra nao gastar memoria da maquina


            //le o resultado do comando () SQL linha por linha, enquanto houver linhas para ler
            while (await leitor.ReadAsync())
            {
                times.Add(new
                {
                    Id = leitor.GetInt32(0), //pega id_time -> coluna 0 do resultado do comando SQL
                    Nome = leitor.GetString(1), //pega nome_time -> coluna 1 do resultado do comando SQL
                    Cidade = leitor.GetString(2) //pega cidade -> coluna 2 do resultado do comando SQL
                });
            }

            // 4. Retorna a lista pronta com status de Sucesso (HTTP 200 OK)
            return Ok(times);
        }

        // Rota HTTP POST: api/times
        [HttpPost]
        public async Task<IActionResult> CadastrarTime([FromBody] TimeDTO novoTime)
        {
            await using var comando = _dataSource.CreateCommand
                ("INSERT INTO time (nome_time, cidade) VALUES (@nome, @cidade);");

            comando.Parameters.AddWithValue("nome", novoTime.Nome);
            comando.Parameters.AddWithValue("cidade", novoTime.Cidade);

            await comando.ExecuteNonQueryAsync();

            //retorna HTTP 201 Created informando que o time foi salvo com sucesso
            //created -> retorna o status code 201 Created, que indica que o recurso foi criado com sucesso.
            //O primeiro parâmetro é a URL do recurso recém-criado (que pode ser deixada vazia se não houver uma URL específica), e o segundo parâmetro é o objeto que foi criado (no caso, o novoTime).

            return Created(string.Empty, novoTime);
        }

        // Classe Auxiliar para converter o JSON recebido no corpo da requisição
        public class TimeDTO
        {
            public string Nome { get; set; }
            public string Cidade { get; set; }
        }
    }
}   