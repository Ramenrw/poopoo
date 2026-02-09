using Microsoft.AspNetCore.Mvc;
using poopoo_backend.Applications.Interfaces;
using poopoo_backend.Auth;
using static Google.Apis.Auth.OAuth2.Web.AuthorizationCodeWebApp;

namespace poopoo_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUsersService _usersService;

        public UsersController(IAuthService authService, IUsersService usersService)
        {
            _authService = authService;
            _usersService = usersService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: true)
                .AddJsonFile("appsettings.Development.json", optional: true)
                .AddEnvironmentVariables()
                .Build();
            var jwtKey = config["Jwt:Key"];
            var result = await _authService
                .LoginAsync(dto.Email, dto.Password)
                .ConfigureAwait(false);
            ;
            if (!result.Success)
                return Unauthorized();

            var token = FakeJwt.CreateToken(result.Data, jwtKey);
            return Ok(new { token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var result = await _authService.RegisterAsync(dto.Email, dto.Password);
            if (!result.Success)
                return BadRequest();

            var profileResult = await _usersService.CreateUserProfileAsync(result.Data, dto);
            if (!profileResult.Success)
                return Problem("Failed to create user profile");
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: true)
                .AddJsonFile("appsettings.Development.json", optional: true)
                .AddEnvironmentVariables()
                .Build();
            var jwtKey = config["Jwt:Key"];
            // put the token inside hearder with Bearer schema
            var token = FakeJwt.CreateToken(result.Data, jwtKey);
            return Ok(new { token });
        }
    }
}
