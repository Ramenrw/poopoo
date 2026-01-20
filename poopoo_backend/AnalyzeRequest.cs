namespace poopoo_backend
{
    /// <summary>
    /// example:
    /// the json body must follow this structure.
    /// { "Image": "base64encodedstring", "UserNotes": "some notes", "CorrectedItems": ["apple", "banana"] }
    /// 
    /// IF needed, we could use Forms instead so the image could be sent as a file. 
    /// </summary>
    /// <param name="Image"></param>
    /// <param name="UserNotes"></param>
    /// <param name="CorrectedItems"></param>
    public record AnalyzeRequest(
        string Image, // base64 encoded image
        string? UserNotes = null, // any notes the user wants to add
        string[]? CorrectedItems = null // items the user corrected.  match the answer index to the DetectedItems index in AnalyzeResponse
    );
}
