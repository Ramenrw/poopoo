using poopoo_backend.Applications.Interfaces;
using poopoo_backend.Domain.Recipes;
using poopoo_backend.Shared.DTOs;
using poopoo_backend.Shared.Results;

namespace poopoo_backend.Applications
{
    public class RecipesService : IRecipesService
    {
        public Task<IReadOnlyCollection<Recipe>> GenerateRecipesForUser(Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyCollection<Recipe>> GetSavedRecipesForUser(Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task<Result> RemoveSavedRecipeForUser(Guid userId, Guid recipeId)
        {
            throw new NotImplementedException();
        }

        public Task<Result> SaveRecipeForUser(Guid userId, RecipeDTO recipe)
        {
            throw new NotImplementedException();
        }
    }
}
