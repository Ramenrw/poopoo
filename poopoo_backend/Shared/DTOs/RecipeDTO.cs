namespace poopoo_backend.Shared.DTOs
{
    public class RecipeDTO
    {
        public string Name { get; set; } = string.Empty;
        public string[] Ingredients { get; set; } = Array.Empty<string>();
        public string[] Instructions { get; set; } = Array.Empty<string>();
        public int PreparationTimeMinutes { get; set; }
        public int CookingTimeMinutes { get; set; }
        public string CuisineType { get; set; } = string.Empty; // e.g., Italian, Chinese, Mexican
        public string MealType { get; set; } = string.Empty; // e.g., Breakfast, Lunch, Dinner, Snack
        public int Servings { get; set; }
        public string[] DietaryRestrictions { get; set; } = Array.Empty<string>(); // e.g., Vegan, Gluten-Free
    }
}
