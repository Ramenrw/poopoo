using poopoo_backend.Shared.Results;

namespace poopoo_backend.Applications.Interfaces
{
    public interface IAuthService
    {
        Task<Result<Guid>> RegisterAsync(string email, string password);

        Task<Result<Guid>> LoginAsync(string email, string password);
    }
}
