using poopoo_backend.Applications.Interfaces;
using poopoo_backend.Auth;
using poopoo_backend.Shared.Results;

namespace poopoo_backend.Applications
{
    public class InMemoryAuthService : IAuthService
    {
        private readonly InMemoryIdentityStore _store;

        public InMemoryAuthService(InMemoryIdentityStore store)
        {
            _store = store;
        }

        public Task<Result<Guid>> RegisterAsync(string email, string password)
        {
            if (_store.EmailExists(email))
                return Task.FromResult(
                    new Result<Guid>(false, Guid.Empty, FailureReason.AlreadyExists)
                );

            var user = _store.Create(email, password);
            return Task.FromResult(new Result<Guid>(true, user.Id));
        }

        public Task<Result<Guid>> LoginAsync(string email, string password)
        {
            var user = _store.GetByEmail(email);
            if (user is null)
                return Task.FromResult(
                    new Result<Guid>(false, Guid.Empty, FailureReason.InvalidState)
                );

            if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                return Task.FromResult(
                    new Result<Guid>(false, Guid.Empty, FailureReason.InvalidState)
                );

            return Task.FromResult(new Result<Guid>(true, user.Id));
        }
    }
}
