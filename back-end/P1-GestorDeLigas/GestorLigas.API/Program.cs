using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// 1. Configura a política de CORS para permitir requisições do React
//controla quem pode fazer requisições pra minha API
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirFrontend", politica =>
    {
        politica.WithOrigins("http://localhost:5173") // Porta padrão do Vite / React
                .AllowAnyHeader()
                .AllowAnyMethod();
    });
});

// Adiciona os serviços da API
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); // Documentação Swagger

// 2. Obtém a String de Conexão do appsettings.json
var connectionString = builder.Configuration.GetConnectionString("ConexaoPostgres");

// 3. Registra o NpgsqlDataSource nos serviços para ser injetado nos Controllers
var dataSourceBuilder = new NpgsqlDataSourceBuilder(connectionString);
var dataSource = dataSourceBuilder.Build();
builder.Services.AddSingleton(dataSource);

var app = builder.Build();

// Configuração visual do Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 4. ATIVA A POLÍTICA DE CORS (deve ficar antes de MapControllers)
app.UseCors("PermitirFrontend");

app.UseAuthorization();
app.MapControllers();

app.Run();