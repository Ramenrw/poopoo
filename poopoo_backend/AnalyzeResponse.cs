namespace poopoo_backend
{
    // dto for response to frontend.
    public record AnalyzeResponse(
        string[] DetectedItems, // items model was able to detect
        string[] UnsureItems, // items model was unsure about
        string[] MealIdeas, // the ideas
        string? Disclaimer = null, // disclaimer about accuracy
        string[]? Questions = null // for the user to answer.
    );
}
