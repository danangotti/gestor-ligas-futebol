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

    await comandoInserir.ExecuteNonQueryAsync();

    // 4. Retorna a confirmação de sucesso
    return Ok("Usuário cadastrado com sucesso!");
    }
    }
}