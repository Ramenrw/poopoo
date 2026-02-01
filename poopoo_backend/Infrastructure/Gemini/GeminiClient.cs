using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using poopoo_backend.Shared.Results;
using static System.Net.WebRequestMethods;

namespace poopoo_backend.Infrastructure.Gemini
{
    public class GeminiClient
    {
        private readonly HttpClient _http;
        private readonly string _apiKey;

        public GeminiClient(HttpClient http, IConfiguration config)
        {
            _http = http;
            _apiKey =
                config["Gemini:ApiKey"]
                ?? throw new InvalidOperationException("Gemini API key missing");
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
                            new { inline_data = new { mime_type = mimeType, data = base64Image } },
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
    }
}
