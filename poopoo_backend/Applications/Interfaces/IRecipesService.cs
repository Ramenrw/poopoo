using poopoo_backend.Domain.Recipes;
using poopoo_backend.Shared.DTOs;
using poopoo_backend.Shared.Results;

namespace poopoo_backend.Applications.Interfaces
{
    public interface IRecipesService
    {
        Task<IReadOnlyCollection<Recipe>> GenerateRecipesForUser(Guid userId);
        Task<IReadOnlyCollection<Recipe>> GetSavedRecipesForUser(Guid userId);
        Task<Result> SaveRecipeForUser(Guid userId, RecipeDTO recipe);
        Task<Result> RemoveSavedRecipeForUser(Guid userId, Guid recipeId);
    }
}
