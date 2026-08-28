using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// Adiciona os serviços da API
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); // Ativa a geração da documentação Swagger

// 1. Obtém a String de Conexão do appsettings.json (gestor_ligas.db)
var connectionString = builder.Configuration.GetConnectionString("ConexaoPostgres");

// 2. Registra o NpgsqlDataSource nos serviços
var dataSourceBuilder = new NpgsqlDataSourceBuilder(connectionString);
var dataSource = dataSourceBuilder.Build();
builder.Services.AddSingleton(dataSource);

var app = builder.Build();

// Configuração da interface visual do Swagger no ambiente de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); // Cria a página visual no caminho /swagger
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();