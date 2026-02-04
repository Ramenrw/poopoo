using poopoo_backend.Domain.Recipes;
using poopoo_backend.Shared.Results;

namespace poopoo_backend.Repositories.Interfaces
{
    public interface IRecipeRepository
    {
        Task<Result> AddAsync(Recipe recipe);
        Task<Result> AddRangeAsync(IList<Recipe> recipe);
        Task<Result<IReadOnlyCollection<Recipe>>> GetRecipesByUserIdAsync(Guid userId);
        Task<Result> RemoveAsync(Guid userId, Guid recipeId);
    }
}
