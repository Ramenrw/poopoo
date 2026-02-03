using System.Text;
using Microsoft.IdentityModel.Tokens;
using poopoo_backend;
using poopoo_backend.Applications;
using poopoo_backend.Applications.Interfaces;
using poopoo_backend.Auth;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<InMemoryIdentityStore>();
builder.Services.AddScoped<IAuthService, InMemoryAuthService>();
builder.Services.AddScoped<IUsersService, UsersService>();

builder
    .Services.AddAuthentication("Bearer")
    .AddJwtBearer(
        "Bearer",
        options =>
        {
            options.TokenValidationParameters = new()
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(
                        "SUPER_SECRET_KEY_THAT_WE_WILL_TOTALLY_USE_PLEASE_DONT_STEAL123"
                    )
                ),
                ValidateLifetime = true,
            };
        }
    );

builder.Services.AddAuthorization();

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// 🔽 SEED HERE
using (var scope = app.Services.CreateScope())
{
    var store = scope.ServiceProvider.GetRequiredService<InMemoryIdentityStore>();
    var userService = scope.ServiceProvider.GetRequiredService<UsersService>();
    // Avoid duplicates on hot reload
    if (store.EmailExists("sharon@waterloo.com"))
        return;

    var identity = store.Create("sharon@waterloo.com", "ilovenewjeans");

    var registerDto = new RegisterDto
    {
        Email = "sharon@waterloo.com",
        PreferredCuisines = new[] { "Chinese", "Filipino" },
        GroceryStoreFrequencyPerWeek = 2,
        Goals = new[] { "High protein", "Muscle gain" },
        Restrictions = Array.Empty<string>(),
    };

    await userService.CreateUserProfileAsync(identity.Id, registerDto);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

var geminiKey = builder.Configuration["Gemini:ApiKey"];

app.Run();
