using poopoo_backend.Repositories.Interfaces;

namespace poopoo_backend.Applications
{
    public class UsersService
    {
        private readonly IUserRepository _userRepository;

        public UsersService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
    }
}
