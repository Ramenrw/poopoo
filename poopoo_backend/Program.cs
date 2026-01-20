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
    // Placeholder for analysis logic using the Gemini API key
    return Results.Ok(new AnalyzeResponse(
        DetectedItems: new string[] { "apple", "banana" },
        UnsureItems: new string[] { "orange" },
        MealIdeas: new string[] { "Fruit Salad", "Smoothie" },
        Disclaimer: "You only have fruit, maybe eat some protein idk.",
        Questions: new string[] { "Do you have any other food items?" }
    ));
});

app.Run();
