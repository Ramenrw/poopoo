using poopoo_backend.Applications.Interfaces;
using poopoo_backend.Domain.Recipes;
using poopoo_backend.Infrastructure.Gemini;
using poopoo_backend.Repositories.Interfaces;
using poopoo_backend.Shared.DTOs;
using poopoo_backend.Shared.Results;

namespace poopoo_backend.Applications
{
    public class RecipesService : IRecipesService
    {
        private readonly GeminiClient _geminiClient;
        private readonly IRecipeRepository _recipeRepository;

        public RecipesService(GeminiClient geminiClient, IRecipeRepository recipeRepository)
        {
            _geminiClient = geminiClient;
            _recipeRepository = recipeRepository;
        }

        public async Task<Result<IReadOnlyCollection<Recipe>>> GenerateRecipesForUser(Guid userId)
        {
            // 1. Generate recipes via Gemini
            var result = await _geminiClient.GenerateRecipesForUserAsync(userId);
            if (!result.Success)
                return new Result<IReadOnlyCollection<Recipe>>(false, null, result.Failure);

            if (result.Data == null || result.Data.Length == 0)
                return new Result<IReadOnlyCollection<Recipe>>(true, Array.Empty<Recipe>());

            // 2. Map DTOs → domain
            var recipes = result.Data.Select(dto => MapToDomain(userId, dto)).ToList();

            // 3. Persist
            var saveResult = await _recipeRepository.AddRangeAsync(recipes);
            if (!saveResult.Success)
                return new Result<IReadOnlyCollection<Recipe>>(false, null, saveResult.Failure);

            return new Result<IReadOnlyCollection<Recipe>>(true, recipes);
        }

        public async Task<IReadOnlyCollection<Recipe>> GetSavedRecipesForUser(Guid userId)
        {
            var result = await _recipeRepository.GetRecipesByUserIdAsync(userId);
            return result.Success ? result.Data ?? Array.Empty<Recipe>() : Array.Empty<Recipe>();
        }

        public async Task<Result> SaveRecipeForUser(Guid userId, RecipeDTO recipe)
        {
            if (recipe == null)
                return new Result(false, FailureReason.ValidationFailed);

            var domainRecipe = MapToDomain(userId, recipe);

            return await _recipeRepository.AddAsync(domainRecipe);
        }

        public Task<Result> RemoveSavedRecipeForUser(Guid userId, Guid recipeId) =>
            _recipeRepository.RemoveAsync(userId, recipeId);

        // ----------------------------
        // Mapping
        // ----------------------------
        private static Recipe MapToDomain(Guid userId, RecipeDTO dto) =>
            new Recipe
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Name = dto.Name,
                Ingredients = dto.Ingredients,
                Instructions = dto.Instructions,
                PreparationTimeMinutes = dto.PreparationTimeMinutes,
                CookingTimeMinutes = dto.CookingTimeMinutes,
                CuisineType = dto.CuisineType,
                MealType = dto.MealType,
                Servings = dto.Servings,
                DietaryRestrictions = dto.DietaryRestrictions,
            };
    }
}
