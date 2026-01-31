using poopoo_backend.Shared.DTOs;
using poopoo_backend.Shared.Results;

namespace poopoo_backend.Applications.Interfaces
{
    public interface IUsersService
    {
        Task<Result> UpdateUserPreferences(Guid userId, UserPreferencesDTO preferences);
    }
}
