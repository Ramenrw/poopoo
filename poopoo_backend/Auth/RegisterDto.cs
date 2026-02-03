namespace poopoo_backend.Auth
{
    public class RegisterDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

        public string? DisplayName { get; set; } = string.Empty;
        public string[] PreferredCuisines { get; set; } = Array.Empty<string>();
        public int GroceryStoreFrequencyPerWeek { get; set; }
        public string[] Goals { get; set; } = Array.Empty<string>();
        public string[] Restrictions { get; set; } = Array.Empty<string>();
    }
}
