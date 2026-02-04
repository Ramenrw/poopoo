using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using poopoo_backend.Applications.Interfaces;
using poopoo_backend.Shared.DTOs;
using poopoo_backend.Shared.Results;
using static System.Net.WebRequestMethods;

namespace poopoo_backend.Infrastructure.Gemini
{
    public class GeminiClient
    {
        private readonly HttpClient _http;
        private readonly string _apiKey;
        private readonly IUsersService _usersService;
        private readonly IItemsService _itemsService;

        public GeminiClient(
            HttpClient http,
            IConfiguration config,
            IUsersService usersService,
            IItemsService itemsService
        )
        {
            _http = http;
            _apiKey =
                config["Gemini:ApiKey"]
                ?? throw new InvalidOperationException("Gemini API key missing");

            _usersService = usersService;
            _itemsService = itemsService;
        }

        public async Task<Result<DetectedItemDto[]>> UploadImageAsync(
            Stream imageStream,
            string mimeType,
            CancellationToken ct = default
        )
        {
            // 1. Read stream → base64
            using var ms = new MemoryStream();
            await imageStream.CopyToAsync(ms, ct);
            var base64Image = Convert.ToBase64String(ms.ToArray());
            var todaysDate = DateTime.UtcNow.ToString("yyyy-MM-dd");

            // 2. Build Gemini 3 payload (snake_case!)
            var payload = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new object[]
                        {
                            new
                            {
                                inline_data = new { mime_type = mimeType, data = base64Image },
                                media_resolution = new { level = "media_resolution_high" },
                            },
                            new
                            {
                                text = string.Format(
                                    """
                                    You are an image recognition system.

                                    Analyze the image and return ONLY valid JSON.
                                    Do not include markdown, explanations, or extra text.

                                    Return an array of objects in this exact schema:

                                    [
                                      {{
                                        "name": "string",
                                        "category": "string",
                                        "quantity": number,
                                        "detectedConfidence": number between 0 and 1,
                                        "expirationDate": "ISO-8601 date or null"
                                      }}
                                    ]

                                    If no items are detected, return an empty array [].

                                    For the expirationDate, give your best estimate based on the item's appearance.
                                    For reference, today's date is {0}.
                                    For the category, choose one of: ingredient, prepared, packaged, or unknown.
                                    """,
                                    todaysDate
                                ),
                            },
                        },
                    },
                },
            };

            var json = JsonSerializer.Serialize(payload);

            using var request = new HttpRequestMessage(
                HttpMethod.Post,
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent"
            );

            request.Headers.Add("x-goog-api-key", _apiKey);
            request.Content = new StringContent(json, Encoding.UTF8, "application/json");

            // 3. Send request
            using var response = await _http.SendAsync(request, ct);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync(ct);
                return new Result<DetectedItemDto[]>(false, null, FailureReason.UnknownError);
            }

            var responseJson = await response.Content.ReadAsStringAsync(ct);

            // 4. Parse Gemini response
            using var doc = JsonDocument.Parse(responseJson);

            var text = doc
                .RootElement.GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts")[0]
                .GetProperty("text")
                .GetString();

            if (string.IsNullOrWhiteSpace(text))
                return new Result<DetectedItemDto[]>(false, Array.Empty<DetectedItemDto>());

            // 5. Deserialize detected items
            var items = JsonSerializer.Deserialize<DetectedItemDto[]>(
                text,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
            );

            return new Result<DetectedItemDto[]>(true, items ?? Array.Empty<DetectedItemDto>());
        }

        public async Task<Result<RecipeDTO[]>> GenerateRecipesForUserAsync(
            Guid userId,
            CancellationToken ct = default
        )
        {
            // 1. Load user profile
            var user = await _usersService.GetUserProfileAsync(userId);
            if (user == null)
                return new Result<RecipeDTO[]>(false, null, FailureReason.NotFound);

            // 2. Load user items
            var items = await _itemsService.GetUserItems(userId);

            if (items.Count == 0)
                return new Result<RecipeDTO[]>(true, Array.Empty<RecipeDTO>());

            var todaysDate = DateTime.UtcNow.ToString("yyyy-MM-dd");

            // 3. Build Gemini payload
            var payload = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new object[]
                        {
                            new
                            {
                                text = string.Format(
                                    """
                                    You are a recipe generation system.

                                    Generate recipes using the available ingredients and user preferences.
                                    Return ONLY valid JSON. No markdown, no explanations, no extra text.

                                    USER PREFERENCES:
                                    - Preferred cuisines: {0}
                                    - Goals: {1}
                                    - Dietary restrictions: {2}
                                    - Grocery trips per week: {3}

                                    AVAILABLE INGREDIENTS (JSON):
                                    {4}

                                    Return an array in this exact schema:

                                    [
                                      {{
                                        "name": "string",
                                        "ingredients": ["string"],
                                        "instructions": ["string"],
                                        "preparationTimeMinutes": number,
                                        "cookingTimeMinutes": number,
                                        "cuisineType": "string",
                                        "mealType": "string",
                                        "servings": number,
                                        "dietaryRestrictions": ["string"]
                                      }}
                                    ]

                                    If no suitable recipes can be generated using ONLY the provided ingredients,
                                    you may additionally assume the user has ONLY the following common staples:
                                    salt, pepper, cooking oil.

                                    Do NOT assume any other ingredients.
                                    If still no recipes can be generated, return an empty array [].
                                    Today's date is {5}.
                                    """,
                                    string.Join(", ", user.PreferredCuisines),
                                    string.Join(", ", user.Goals),
                                    string.Join(", ", user.Restrictions),
                                    user.GroceryStoreFrequencyPerWeek,
                                    JsonSerializer.Serialize(
                                        items.Select(i => new
                                        {
                                            name = i.Name,
                                            expiryDate = i.ExpirationDate,
                                        })
                                    ),
                                    todaysDate
                                ),
                            },
                        },
                    },
                },
            };

            var json = JsonSerializer.Serialize(payload);

            using var request = new HttpRequestMessage(
                HttpMethod.Post,
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent"
            );

            request.Headers.Add("x-goog-api-key", _apiKey);
            request.Content = new StringContent(json, Encoding.UTF8, "application/json");

            // 4. Send request
            using var response = await _http.SendAsync(request, ct);

            if (!response.IsSuccessStatusCode)
                return new Result<RecipeDTO[]>(false, null, FailureReason.UnknownError);

            var responseJson = await response.Content.ReadAsStringAsync(ct);

            // 5. Parse Gemini response
            using var doc = JsonDocument.Parse(responseJson);

            var text = doc
                .RootElement.GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts")[0]
                .GetProperty("text")
                .GetString();

            if (string.IsNullOrWhiteSpace(text))
                return new Result<RecipeDTO[]>(true, Array.Empty<RecipeDTO>());

            // 6. Deserialize recipes
            try
            {
                var recipes =
                    JsonSerializer.Deserialize<RecipeDTO[]>(
                        text,
                        new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
                    ) ?? Array.Empty<RecipeDTO>();

                return new Result<RecipeDTO[]>(true, recipes);
            }
            catch
            {
                return new Result<RecipeDTO[]>(false, null, FailureReason.UnknownError);
            }
        }
    }
}
