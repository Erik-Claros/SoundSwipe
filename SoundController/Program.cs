using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore; // Ensure this is included for EF Core

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers(); 

// Register the ApplicationDbContext with SQLite
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))); // Adjust path as needed

Console.WriteLine(builder.Configuration.GetConnectionString("DefaultConnection"));

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

// Map all API controllers
app.MapControllers();

app.Run();
