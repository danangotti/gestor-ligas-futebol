using Microsoft.AspNetCore.Mvc;
using Npgsql;
using RegrasDeNegocioPOO.DTOs;
using BCrypt.Net;

namespace GestorLigas.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class UsuariosController : ControllerBase
    {
        private readonly NpgsqlDataSource _dataSource;

        // Injeção de Dependência: O .NET entrega a conexão configurada no Program.cs
        public UsuariosController(NpgsqlDataSource dataSource)
        {
            _dataSource = dataSource;
        }

        [HttpPost]
    public async Task<IActionResult> CadastrarUsuario([FromBody] UsuarioCadastroDTO novoUsuario)
    {
    // verificar se ja tem aquele email no bd, se o count der > 0, ele ja existe
    await using var comandoVerificaEmail = _dataSource.CreateCommand(
        "SELECT COUNT(*) FROM usuario WHERE email = @email;"
    );
    comandoVerificaEmail.Parameters.AddWithValue("email", novoUsuario.Email);

    // converte o valor retornado pelo COUNT(*) para um número inteiro
    //ExecuteScalarAsync -> metodo ideal quando esperamos o retorno de uma linha/coluna (count *)
    long quantidadeUsuarios = (long)(await comandoVerificaEmail.ExecuteScalarAsync() ?? 0L);

    // Se encontrou 1 ou mais, encerra imediatamente com status 400 Bad Request
    if (quantidadeUsuarios > 0)
    {
        return BadRequest("Este e-mail já está em uso.");
    }

    // senao, criptografa a senha
    string senhaCriptografada = BCrypt.Net.BCrypt.HashPassword(novoUsuario.Senha);

    // prepara e executa a inserção
    await using var comandoInserir = _dataSource.CreateCommand(
        "INSERT INTO usuario (nome_usuario, email, senha_hash) VALUES (@nome, @email, @senha);"
    );
    comandoInserir.Parameters.AddWithValue("nome", novoUsuario.Nome);
    comandoInserir.Parameters.AddWithValue("email", novoUsuario.Email);
    comandoInserir.Parameters.AddWithValue("senha", senhaCriptografada);

    //ExecuteNonQueryAsync -> É o método utilizado para instruções que não retornam conjuntos de linhas (como INSERT, UPDATE ou DELETE
    //executa a operacao e devolve o numero de linha afetadas
    await comandoInserir.ExecuteNonQueryAsync();

    // 4. Retorna a confirmação de sucesso
    return Ok("Usuário cadastrado com sucesso!");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UsuarioLoginDTO dadosLogin)
        {
            //usuario envia email e senha
            //comando que pega alguns dados do usuario que passou o email passado
            await using var comando = _dataSource.CreateCommand(
                "SELECT id_usuario, nome_usuario, senha_hash FROM usuario WHERE email = @email;"
            );

            //passar valor para @email, para buscar oq eu preciso
            comando.Parameters.AddWithValue("email",dadosLogin.Email);

            //criar uma variavel que vai ler os dados que foram retornados da busca
            await using var leitor = await comando.ExecuteReaderAsync();

            //verificar se ele encontrou um usuario com aquele email (verifica se o email existe)
            if(!await leitor.ReadAsync())
            {
                return Unauthorized("E-mail ou senha incorretos.");
            }
            //se passou por esse if, é que o email pertence a algum usuario, agora preciso verificar se a senha enviada bate com a senha do bd
            //a senha vai ser enviada sem ser criptografada, entao tenho q usar o metodo pra ver se ela bate com a criptografada

            //pega a senha do BD
            string hashDoBanco = leitor["senha_hash"].ToString()!;

            //usa o metodo bcrypt pra ver se bate com a senha passada
            //metodo pega a nao criptografada e ve se ela bate com a criptografada
            bool senhaValida = BCrypt.Net.BCrypt.Verify(dadosLogin.Senha,hashDoBanco);

            if (!senhaValida)
            {
                return Unauthorized("E-mail ou senha incorretos.");
            }

            //pegar alguns dados para devolver pro frontend
            string nomeUsuario = leitor["nome_usuario"].ToString()!;
            int idUsuario = Convert.ToInt32(leitor["id_usuario"]);

            
            return Ok(new 
            {
            mensagem = "Login realizado com sucesso!",
            id = idUsuario,
            nome = nomeUsuario
            });
        }
    }

    
}