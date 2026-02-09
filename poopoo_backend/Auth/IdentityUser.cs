namespace poopoo_backend.Auth
{
    public class IdentityUser
    {
        public Guid Id { get; init; }
        public string Email { get; init; } = string.Empty;
        public string PasswordHash { get; init; } = string.Empty;
    }
}
