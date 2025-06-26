using WashingMachine.Sessions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddOpenApi();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapHub<SessionHub>("/sessionhub");
app.UseHttpsRedirection();

app.MapGet("/health", () => "Healthy");

app.Run();