using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Abstractions;
using poopoo_backend.Applications.Fakes;
using poopoo_backend.Domain.Items;
using poopoo_backend.Domain.Users;
using poopoo_backend.Infrastructure.Gemini;
using Xunit;

public class GeminiClientIntegrationTests
{
    [Fact]
    public async Task UploadImageAsync_CallsRealGeminiAndReturnsItems()
    {
        // Arrange: config
        var config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", optional: true)
            .AddJsonFile("appsettings.Development.json", optional: true)
            .AddEnvironmentVariables()
            .Build();

        var apiKey = config["Gemini:ApiKey"];
        Assert.False(string.IsNullOrWhiteSpace(apiKey));

        // Arrange: fake user + empty items service
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = "test@example.com",
            DisplayName = "Test User",
        };

        var usersService = new FakeUsersService(user);
        var itemsService = new FakeItemsService(Array.Empty<Item>());

        var httpClient = new HttpClient();

        var geminiClient = new GeminiClient(httpClient, config, NullLogger<GeminiClient>.Instance);

        var imagePath = Path.Combine(AppContext.BaseDirectory, "Images", "pic1.jpg");
        await using var imageStream = File.OpenRead(imagePath);

        // Act
        var result = await geminiClient.UploadImageAsync(imageStream, "image/jpeg");

        // Assert
        Assert.True(result.Success);
        Assert.NotNull(result.Data);

        foreach (var item in result.Data!)
        {
            Assert.False(string.IsNullOrWhiteSpace(item.Name));
            Assert.InRange(item.DetectedConfidence, 0f, 1f);
        }
    }
}
