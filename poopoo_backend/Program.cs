using poopoo_backend;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();


var geminiKey = builder.Configuration["Gemini:ApiKey"];

app.MapPost("/analyze", (AnalyzeRequest request) =>
{

    return Results.Ok(new AnalyzeResponse(
          DetectedItems: new string[] { "apple", "banana", "carrot" },
          UnsureItems: new string[] { "mango" },
          MealIdeas: new string[]
          {
            "Fruit Salad with Apple, Banana, and Carrot",
            "Smoothie with Apple and Banana"
          },
          Disclaimer: "This analysis is based on image recognition and may not be 100% accurate.",
          Questions: new string[]
          {
            "Do you have any dietary restrictions?",
            "Are you allergic to any foods?"
          }
      ));
});

app.Run();
