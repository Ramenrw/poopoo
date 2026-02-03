using poopoo_backend.Applications.Interfaces;
using poopoo_backend.Auth;
using poopoo_backend.Repositories.Interfaces;
using poopoo_backend.Shared.DTOs;
using poopoo_backend.Shared.Results;

namespace poopoo_backend.Applications
{
    public class UsersService : IUsersService
    {
        private readonly IUserRepository _userRepository;

        public UsersService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public Task<Result> CreateUserProfileAsync(Guid authId, RegisterDto registerDto)
        {
            throw new NotImplementedException();
        }

        public Task<Result> UpdateUserPreferences(Guid userId, UserPreferencesDTO preferences)
        {
            throw new NotImplementedException();
        }
    }
}
