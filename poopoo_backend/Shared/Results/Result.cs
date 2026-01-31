namespace poopoo_backend.Shared.Results
{
    public static class Results
    {
        public static Result Ok() => new(true);

        public static Result<T> Ok<T>(T data) => new(true, data);

        public static Result Fail(FailureReason reason) => new(false, reason);

        public static Result<T> Fail<T>(FailureReason reason) => new(false, default, reason);
    }

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
