using System.Text;
using Microsoft.IdentityModel.Tokens;
using poopoo_backend;
using poopoo_backend.Applications;
using poopoo_backend.Applications.Interfaces;
using poopoo_backend.Auth;
using poopoo_backend.Infrastructure.Gemini;
using poopoo_backend.Repositories;
using poopoo_backend.Repositories.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<InMemoryIdentityStore>();
builder.Services.AddScoped<IAuthService, InMemoryAuthService>();
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddScoped<IItemsService, ItemsService>();
builder.Services.AddScoped<IRecipesService, RecipesService>();

builder.Services.AddSingleton<IItemRepository, InMemoryItemRepository>();
builder.Services.AddSingleton<IUserRepository, InMemoryUserRepository>();
builder.Services.AddSingleton<IRecipeRepository, InMemoryRecipeRepository>();
var jwtKey = builder.Configuration["Jwt:Key"];
builder
    .Services.AddAuthentication("Bearer")
    .AddJwtBearer(
        "Bearer",
        options =>
        {
            options.RequireHttpsMetadata = false;
            options.TokenValidationParameters = new()
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!)),
                ValidateLifetime = true,
            };
        }
    );

builder.Services.AddAuthorization();

builder.Services.AddHttpClient<GeminiClient>(client =>
{
    client.Timeout = TimeSpan.FromSeconds(60);
});

builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

//using (var scope = app.Services.CreateScope())
//{
//    var store = scope.ServiceProvider.GetRequiredService<InMemoryIdentityStore>();
//    var userService = scope.ServiceProvider.GetRequiredService<IUsersService>();
//    // Avoid duplicates on hot reload
//    if (!store.EmailExists("sharon@waterloo.com"))
//    {
//        var identity = store.Create("sharon@waterloo.com", "ilovenewjeans");

//        var registerDto = new RegisterDto
//        {
//            Email = "sharon@waterloo.com",
//            PreferredCuisines = new[] { "Chinese", "Filipino" },
//            GroceryStoreFrequencyPerWeek = 2,
//            Goals = new[] { "High protein", "Muscle gain" },
//            Restrictions = Array.Empty<string>(),
//        };

//        await userService.CreateUserProfileAsync(identity.Id, registerDto);
//    }
//}

_ = Task.Run(async () =>
{
    try
    {
        // Use CreateAsyncScope for better thread handling
        using var scope = app.Services.CreateAsyncScope();
        var store = scope.ServiceProvider.GetRequiredService<InMemoryIdentityStore>();
        var userService = scope.ServiceProvider.GetRequiredService<IUsersService>();
        var itemsService = scope.ServiceProvider.GetRequiredService<IItemsService>();

        if (!store.EmailExists("sharon@waterloo.com"))
        {
            var identity = store.Create("sharon@waterloo.com", "ilovenewjeans");
            // This can now take 10 seconds or 10 minutes without hanging the /ok route
            var registerDto = new RegisterDto
            {
                Email = "sharon@waterloo.com",
                PreferredCuisines = new[] { "Chinese", "Filipino" },
                GroceryStoreFrequencyPerWeek = 2,
                Goals = new[] { "High protein", "Muscle gain" },
                Restrictions = Array.Empty<string>(),
            };
            await userService.CreateUserProfileAsync(identity.Id, registerDto);
            await itemsService.ManuallyEnterItemAsync(identity.Id, "Chicken Breast", null);
            await itemsService.ManuallyEnterItemAsync(identity.Id, "Garlic", null);
            await itemsService.ManuallyEnterItemAsync(identity.Id, "Ginger", null);
            await itemsService.ManuallyEnterItemAsync(identity.Id, "Soy Sauce", null);

            await itemsService.ManuallyEnterItemAsync(identity.Id, "Bok Choy", null);
            await itemsService.ManuallyEnterItemAsync(identity.Id, "Broccoli", null);

            await itemsService.ManuallyEnterItemAsync(identity.Id, "White Rice", null);
        }
    }
    catch (Exception ex)
    {
        // Check logs for this!
        Console.WriteLine($"Startup Seeding Failed: {ex.Message}");
    }
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

//app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

var geminiKey = builder.Configuration["Gemini:ApiKey"];

app.Run();
