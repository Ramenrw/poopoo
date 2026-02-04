using poopoo_backend.Applications.Interfaces;
using poopoo_backend.Auth;
using poopoo_backend.Domain.Users;
using poopoo_backend.Shared.DTOs;
using poopoo_backend.Shared.Results;

// FOR TESTING RECIPES GEMINI CALL
namespace poopoo_backend.Applications.Fakes
{
    public sealed class FakeUsersService : IUsersService
    {
        private readonly User _user;

        public FakeUsersService(User user)
        {
            _user = user;
        }

        public Task<User?> GetUserProfileAsync(Guid userId) =>
            Task.FromResult(userId == _user.Id ? _user : null);

        public Task<Result> UpdateUserPreferences(Guid userId, UserPreferencesDTO preferences) =>
            Task.FromResult(new Result(true));

        public Task<Result> CreateUserProfileAsync(Guid authId, RegisterDto registerDto) =>
            Task.FromResult(new Result(true));
    }
}
