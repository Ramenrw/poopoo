using System.Collections.Concurrent;
using poopoo_backend.Domain.Users;
using poopoo_backend.Repositories.Interfaces;
using poopoo_backend.Shared.Results;

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

        public Task<Result> AddUserAsync(User user)
        {
            if (user.Id == Guid.Empty)
                user.Id = Guid.NewGuid();

            _users[user.Id] = user;
            return Task.FromResult(new Result(true));
        }

        public Task<Result> DeleteUserAsync(Guid userId)
        {
            _users.TryRemove(userId, out _);
            return Task.FromResult(new Result(true));
        }
    }
}
