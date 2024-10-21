using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers(); 

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()  // Allow any origin
                          .AllowAnyMethod()  // Allow any method (GET, POST, etc.)
                          .AllowAnyHeader()); // Allow any header
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API v1");
        c.RoutePrefix = string.Empty; 
    });
}

app.UseHttpsRedirection();

// Enable CORS
app.UseCors("AllowAll"); // Use the CORS policy defined above

// This line maps all API controllers, including SpotifyController
app.MapControllers();

app.Run();
