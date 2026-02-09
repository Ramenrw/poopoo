namespace poopoo_backend.Infrastructure.Gemini
{
    public sealed class GeminiUploadedFile
    {
        public required string FileName { get; init; } // e.g. files/abc123
        public required string MimeType { get; init; }
        public string? Uri { get; init; }
    }
}
