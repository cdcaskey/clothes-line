using WashingMachine.Sessions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddOpenApi();

builder.Services.AddSingleton<ConnectionMapper>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowedOrigins",
        policy =>
        {
            policy.WithOrigins(
                    "http://localhost:5173",
                    "https://clothes-line.chriscaskey.co.uk"
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials(); // Needed for SignalR
        });
});


var app = builder.Build();
app.UseCors("AllowedOrigins");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapHub<SessionHub>("/sessionhub");
app.UseHttpsRedirection();

app.MapGet("/health", () => "Healthy");

app.Run();