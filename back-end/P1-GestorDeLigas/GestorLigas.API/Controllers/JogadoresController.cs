using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data.Common;

namespace GestorLigas.API.Controllers
{
    [ApiController]                  // 1. Dica ao .NET de que é uma API Web (responde JSON)
    [Route("api/[controller]")]      // 2. Define a URL base (ex: api/jogadores)
    public class JogadoresController : ControllerBase // 3. Herda da classe base da API
    {
        // 4. (Recomendado) Injeção de Dependência do Banco
        private readonly NpgsqlDataSource _conexaoBanco;

        public JogadoresController(NpgsqlDataSource conexaoBanco)
        {
            _conexaoBanco = conexaoBanco;
        }

        // Métodos de rota (GET, POST, PUT, DELETE) entram aqui dentro!
        [HttpGet] 
        public async Task<IActionResult> ObterTodosOsJogadores() 
        {
            var jogadores = new List<object>();

            //createcommand () cria um comando SQL para ser executado no banco de dados
            await using var comando = _conexaoBanco.CreateCommand("SELECT id_jogador, nome_jogador, posicao, numero_camisa FROM jogador;");

            // ExecuteReaderAsync() executa o comando SQL e retorna um leitor de dados (reader) para ler os resultados
            await using var leitor = await comando.ExecuteReaderAsync();

            //await using é usado para garantir que o c# feche a conexao imediatamente após o uso, pra nao gastar memoria da maquina

            //le o resultado do comando () SQL linha por linha, enquanto houver linhas para ler
            while (await leitor.ReadAsync())
            {
                jogadores.Add(new
                {
                    Id = leitor.GetInt32(0), //pega id_jogador -> coluna 0 do resultado do comando SQL
                    Nome = leitor.GetString(1), //pega nome_jogador -> coluna 1 do resultado do comando SQL
                    Posicao = leitor.GetString(2), //pega posicao -> coluna 2 do resultado do comando SQL
                    NumeroCamisa = leitor.GetInt32(3) //pega numero_camisa -> coluna 3 do resultado do comando SQL
                });
            }

            // 4. Retorna a lista pronta com status de Sucesso (HTTP 200 OK)
            return Ok(jogadores);
        }



        //Rota HTTP de Criação/Inserção
        [HttpPost]
        //[FromBody] JogadorDTO -> cliente vai um objeto JSON no corpo da requisição,
        //e o .NET vai transformar para a classe JogadorDTO(em c#) automaticamente
        public async Task<IActionResult> CadastrarJogador([FromBody] JogadorDTO novoJogador)
        {
            // montar o comando SQL INSERT com os parâmetros (@nome, @posicao, @numero, @idTime)
            //INSERT INTO jogador (nome_jogador, posicao, numero_camisa, id_time) VALUES (@nome, @posicao, @numero, @idTime);
            await using var comando = _conexaoBanco.CreateCommand
            ("INSERT INTO jogador (nome_jogador, posicao, numero_camisa,id_time) VALUES (@nome, @posicao, @numero, @idTime)");


            //parameters é uma coleção de parâmetros do comando SQL, que são usados para evitar SQL Injection (sql malicioso)
            //add with value adiciona um PARAMETRO com o NOME e o VALOR CORRESPONDENTE
            //use comando.Parameters.AddWithValue("nome", novoJogador.Nome);
            comando.Parameters.AddWithValue("nome", novoJogador.Nome);
            comando.Parameters.AddWithValue("posicao", novoJogador.Posicao);
            comando.Parameters.AddWithValue("numero", novoJogador.NumeroCamisa);
            comando.Parameters.AddWithValue("idTime", novoJogador.IdTime);


            //executa o comando no banco de dados que NÃO retorna linhas (APENAS ALTERA o banco)
            //em vez de ExecuteReaderAsync(), para INSERT/UPDATE usamos ExecuteNonQueryAsync()
            //retorna linhas -> ExecuteReaderAsync() (ideal para SELECT -> coleta de dados)
            //apenas altera o banco -> ExecuteNonQueryAsync() (ideal para INSERT/UPDATE/DELETE)
            await comando.ExecuteNonQueryAsync();

            return Ok("Jogador cadastrado com sucesso!");
        }

        // Classe Auxiliar para receber os dados informados no corpo (Body) da requisição
        public class JogadorDTO
        {
            public string Nome { get; set; }
            public string Posicao { get; set; }
            public int NumeroCamisa { get; set; }
            public int IdTime { get; set; }
        }
    }
}