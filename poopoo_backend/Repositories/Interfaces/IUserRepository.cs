using poopoo_backend.Domain.Users;

namespace poopoo_backend.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetUserAsync(Guid userId);
        Task AddUserAsync(User user);
        Task DeleteUserAsync(Guid userId);
    }
}
