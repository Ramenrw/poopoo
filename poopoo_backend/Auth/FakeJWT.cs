using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace poopoo_backend.Auth
{
    public static class FakeJwt
    {
        private static readonly byte[] Key = Encoding.UTF8.GetBytes(
            "SUPER_SECRET_KEY_THAT_WE_WILL_TOTALLY_USE_PLEASE_DONT_STEAL123"
        );

        public static string CreateToken(Guid userId)
        {
            var claims = new[] { new Claim(ClaimTypes.NameIdentifier, userId.ToString()) };

            var creds = new SigningCredentials(
                new SymmetricSecurityKey(Key),
                SecurityAlgorithms.HmacSha256
            );

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
