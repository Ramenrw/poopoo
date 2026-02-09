using poopoo_backend.Applications.Interfaces;
using poopoo_backend.Auth;
using poopoo_backend.Domain.Users;
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

        public async Task<Result> CreateUserProfileAsync(Guid authId, RegisterDto registerDto)
        {
            var userProfile = new User
            {
                Id = authId,
                Email = registerDto.Email,
                DisplayName = registerDto.DisplayName ?? registerDto.Email,
                PreferredCuisines = registerDto.PreferredCuisines,
                GroceryStoreFrequencyPerWeek = registerDto.GroceryStoreFrequencyPerWeek,
                Goals = registerDto.Goals,
                Restrictions = registerDto.Restrictions,
            };
            return await _userRepository.AddUserAsync(userProfile);
        }

        public async Task<User?> GetUserProfileAsync(Guid userId)
        {
            return await _userRepository.GetUserAsync(userId);
        }

        public async Task<Result> UpdateUserPreferences(Guid userId, UserPreferencesDTO preferences)
        {
            var res = await _userRepository.GetUserAsync(userId);
            if (res is null)
            {
                return new Result(false, FailureReason.NotFound);
            }
            res.UpdatePreferences(
                preferences.PreferredCuisines,
                preferences.Goals,
                preferences.GroceryStoreFrequencyPerWeek,
                preferences.Restrictions
            );
            return await _userRepository.AddUserAsync(res);
        }
    }
}
