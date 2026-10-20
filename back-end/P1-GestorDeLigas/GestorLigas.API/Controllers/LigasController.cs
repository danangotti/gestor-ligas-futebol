using Microsoft.AspNetCore.Mvc;
using Npgsql;
using RegrasDeNegocioPOO.DTOs;
using BCrypt.Net;

namespace GestorLigas.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LigasController : ControllerBase
    {
        private readonly NpgsqlDataSource _conexaoBanco;

        public LigasController(NpgsqlDataSource conexaoBanco)
        {
            _conexaoBanco = conexaoBanco;
        }

        [HttpPost]
        public async Task<IActionResult> CriarLiga(CriarLigaDTO dados)
        {
            await using var comandoInserir = _conexaoBanco.CreateCommand
            ("INSERT INTO liga (nome_liga, formato, quantidade_times, id_usuario) VALUES (@nomeLiga, @formato, @quantidadeTimes, @idUsuario)");

            comandoInserir.Parameters.AddWithValue("@nomeLiga", dados.NomeLiga);
            comandoInserir.Parameters.AddWithValue("@formato", dados.Formato);
            comandoInserir.Parameters.AddWithValue("@quantidadeTimes", dados.QuantidadeTimes);
            comandoInserir.Parameters.AddWithValue("@idUsuario", dados.IdUsuario);

            //executar a gravação no banco de dados -> ExecuteNonQueryAsync()
            await comandoInserir.ExecuteNonQueryAsync();
            //NonQuery -> significa não consultar, ele devolve quantas linhas foram afetadas

            //Metodo Ok() gera status 200
            return Ok(new { mensagem = "Liga criada com sucesso!" });
        }
    }
}