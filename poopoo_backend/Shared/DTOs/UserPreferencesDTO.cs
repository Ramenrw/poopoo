namespace poopoo_backend.Shared.DTOs
{
    public class UserPreferencesDTO
    {
        public string[] PreferredCuisines { get; set; } = Array.Empty<string>();
        public int GroceryStoreFrequencyPerWeek { get; set; }
        public string[] Goals { get; set; } = Array.Empty<string>();
        public string[] Restrictions { get; set; } = Array.Empty<string>();
    }
}
