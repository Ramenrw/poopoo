using poopoo_backend.Domain.Users;
using poopoo_backend.Repositories.Interfaces;
using System.Collections.Concurrent;

namespace poopoo_backend.Repositories
{
    public sealed class InMemoryUserRepository : IUserRepository
    {
        private readonly ConcurrentDictionary<Guid, User> _users = new();

        public Task<User?> GetUserAsync(Guid userId)
        {
            _users.TryGetValue(userId, out var user);
            return Task.FromResult(user);
        }

        public Task AddUserAsync(User user)
        {
            if (user.Id == Guid.Empty)
                user.Id = Guid.NewGuid();

            _users[user.Id] = user;
            return Task.CompletedTask;
        }

        public Task DeleteUserAsync(Guid userId)
        {
            _users.TryRemove(userId, out _);
            return Task.CompletedTask;
        }
    }
}
