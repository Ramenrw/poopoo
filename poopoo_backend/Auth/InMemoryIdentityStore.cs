using System.Collections.Concurrent;

namespace poopoo_backend.Auth
{
    public class InMemoryIdentityStore
    {
        private readonly ConcurrentDictionary<string, IdentityUser> _usersByEmail = new();

        public bool EmailExists(string email) => _usersByEmail.ContainsKey(email);

        public IdentityUser? GetByEmail(string email) =>
            _usersByEmail.TryGetValue(email, out var user) ? user : null;

        public IdentityUser Create(string email, string password)
        {
            var user = new IdentityUser
            {
                Id = Guid.NewGuid(),
                Email = email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
            };

            if (!_usersByEmail.TryAdd(email, user))
                throw new InvalidOperationException("User already exists");

            return user;
        }
    }
}
