using Microsoft.Extensions.Configuration;
using poopoo_backend.Applications.Fakes;
using poopoo_backend.Domain.Items;
using poopoo_backend.Domain.Users;
using poopoo_backend.Infrastructure.Gemini;
using Xunit;

namespace poopoo_backend_tests
{
    public class GeminiClientRecipeIntegrationTests
    {
        [Fact]
        public async Task GenerateRecipesForUserAsync_CallsRealGeminiAndReturnsRecipes()
        {
            // Arrange: config
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: true)
                .AddJsonFile("appsettings.Development.json", optional: true)
                .AddEnvironmentVariables()
                .Build();

            var apiKey = config["Gemini:ApiKey"];
            Assert.False(string.IsNullOrWhiteSpace(apiKey));

            // Arrange: user
            var userId = Guid.NewGuid();
            var user = new User
            {
                Id = userId,
                Email = "test@example.com",
                DisplayName = "Test User",
                PreferredCuisines = new[] { "Italian" },
                Goals = new[] { "High Protein" },
                Restrictions = Array.Empty<string>(),
                GroceryStoreFrequencyPerWeek = 2,
            };

            // Arrange: pantry items
            var items = new[]
            {
                new Item { Name = "Chicken breast", UserId = userId },
                new Item { Name = "Rice", UserId = userId },
                new Item { Name = "Garlic", UserId = userId },
            };

            var usersService = new FakeUsersService(user);
            var itemsService = new FakeItemsService(items);

            var httpClient = new HttpClient();

            var geminiClient = new GeminiClient(httpClient, config, usersService, itemsService);

            // Act
            var result = await geminiClient.GenerateRecipesForUserAsync(userId);

            // Assert
            Assert.True(result.Success);
            Assert.Null(result.Failure);
            Assert.NotNull(result.Data);
            Assert.NotEmpty(result.Data!);

            foreach (var recipe in result.Data!)
            {
                Assert.False(string.IsNullOrWhiteSpace(recipe.Name));
                Assert.NotEmpty(recipe.Ingredients);
                Assert.NotEmpty(recipe.Instructions);
                Assert.True(recipe.Servings > 0);
            }
            Console.WriteLine($"Generated {result.Data!.Length} recipes:");
        }
    }
}
