namespace poopoo_backend.Shared.Results
{
    public record Result(bool Success, FailureReason? Failure = null);

    public record Result<T>(bool Success, T? Data = default, FailureReason? Failure = null);

    public enum FailureReason
    {
        NotFound,
        AlreadyExists,
        InUse,
        InvalidState,
        ValidationFailed,
        UnknownError,
    }
}
