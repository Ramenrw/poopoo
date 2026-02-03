using poopoo_backend.Domain.Users;
using poopoo_backend.Shared.Results;

namespace poopoo_backend.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetUserAsync(Guid userId);
        Task<Result> AddUserAsync(User user);
        Task<Result> DeleteUserAsync(Guid userId);
    }
}
