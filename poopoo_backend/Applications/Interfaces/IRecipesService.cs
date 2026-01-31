using poopoo_backend.Domain.Recipes;

namespace poopoo_backend.Applications.Interfaces
{
    public interface IRecipesService
    {
        Task<IReadOnlyCollection<Recipe>> GenerateRecipesForUser(Guid userId);
    }
}
