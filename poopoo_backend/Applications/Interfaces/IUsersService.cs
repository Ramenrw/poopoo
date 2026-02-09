using poopoo_backend.Auth;
using poopoo_backend.Domain.Users;
using poopoo_backend.Shared.DTOs;
using poopoo_backend.Shared.Results;

namespace poopoo_backend.Applications.Interfaces
{
    public interface IUsersService
    {
        Task<Result> UpdateUserPreferences(Guid userId, UserPreferencesDTO preferences);
        Task<Result> CreateUserProfileAsync(Guid authId, RegisterDto registerDto);
        Task<User?> GetUserProfileAsync(Guid userId);
    }
}
