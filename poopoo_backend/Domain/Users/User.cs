namespace poopoo_backend.Domain.Users
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string DisplayName { get; set; } = string.Empty;
        public string[] PreferredCuisines { get; set; } = Array.Empty<string>();
        public int GroceryStoreFrequencyPerWeek { get; set; }
        public string[] Goals { get; set; } = Array.Empty<string>();
        public string[] Restrictions { get; set; } = Array.Empty<string>();

        public void UpdatePreferences(
            string[] preferredCuisines,
            string[] goals,
            int groceryFrequencyPerWeek,
            string[] restrictions
        )
        {
            PreferredCuisines = preferredCuisines;
            Goals = goals;
            GroceryStoreFrequencyPerWeek = groceryFrequencyPerWeek;
            Restrictions = restrictions;
        }
    }
}
