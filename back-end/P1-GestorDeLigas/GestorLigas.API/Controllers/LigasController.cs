using Microsoft.AspNetCore.Mvc;
using Npgsql;
using RegrasDeNegocioPOO.DTOs;
using BCrypt.Net;
using System.Runtime.ExceptionServices;
using System.Text.Json;

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
            ("INSERT INTO liga (nome_liga, formato, quantidade_times, id_usuario, configuracao) VALUES (@nomeLiga, @formato, @quantidadeTimes, @idUsuario, @Configuracao::jsonb)");

            comandoInserir.Parameters.AddWithValue("@nomeLiga", dados.NomeLiga);
            comandoInserir.Parameters.AddWithValue("@formato", dados.Formato);
            comandoInserir.Parameters.AddWithValue("@quantidadeTimes", dados.QuantidadeTimes);
            comandoInserir.Parameters.AddWithValue("@idUsuario", dados.IdUsuario);
            comandoInserir.Parameters.AddWithValue("@configuracao", dados.Configuracao.GetRawText());

            //executar a gravação no banco de dados -> ExecuteNonQueryAsync()
            await comandoInserir.ExecuteNonQueryAsync();
            //NonQuery -> significa não consultar, ele devolve quantas linhas foram afetadas

            //Metodo Ok() gera status 200
            return Ok(new { mensagem = "Liga criada com sucesso!" });
        }
        
        //pega o id do usuario logado
        [HttpGet("usuario/{idUsuario}")]
        public async Task<IActionResult> BuscarLigasPorUsuario(int idUsuario)
        {
            //list para guardar o resultado da busca, as ligas desse usuario
            var listaDeLigas = new List<LigaRespostaDTO>();

            await using var comandoBuscar = _conexaoBanco.CreateCommand
            ("SELECT id_liga, nome_liga, formato, quantidade_times, status_competicao, configuracao FROM liga WHERE id_usuario = @idUsuario");

            comandoBuscar.Parameters.AddWithValue("@idUsuario", idUsuario);
            
            //guardar a resposta em uma variavel
            await using var leitor = await comandoBuscar.ExecuteReaderAsync();

            while (await leitor.ReadAsync())
            {
            // A cada volta deste laço, esta em UMA linha da tabela liga.
            int idLiga = Convert.ToInt32(leitor["id_liga"]);
            string nomeLiga = leitor["nome_liga"].ToString();
            string formato = leitor["formato"].ToString();
            int qtdTimes = Convert.ToInt32(leitor["quantidade_times"]);
            string statusCompeticao = leitor["status_competicao"].ToString();
            // 1. Pega o texto do banco (conferindo se não veio nulo)
            string textoConfiguracao = leitor["configuracao"]?.ToString();

            // 2. Se tiver texto, transformamos em JsonElement; se não tiver, deixamos vazio/nulo
            JsonElement configuracaoElement = !string.IsNullOrEmpty(textoConfiguracao)
            ? JsonDocument.Parse(textoConfiguracao).RootElement
            : default;

            // cria um objeto LigaRespostaDTO e preenche com os dados dessa linha
            var liga = new LigaRespostaDTO
            {
                IdLiga = idLiga,
                NomeLiga = nomeLiga,
                Formato = formato,
                QuantidadeTimes = qtdTimes,
                StatusCompeticao = statusCompeticao,
                Configuracao = configuracaoElement
            };

            listaDeLigas.Add(liga);
            }

            return Ok(listaDeLigas);
        }

    }
}