namespace poopoo_backend.Infrastructure.Gemini
{
    public sealed class DetectedItemDto
    {
        public string Name { get; init; } = string.Empty;
        public string Category { get; init; } = string.Empty;
        public int Quantity { get; init; }
        public float DetectedConfidence { get; init; }
        public DateTime? ExpirationDate { get; init; }
    }
}
