using System.Collections.Concurrent;
using poopoo_backend.Domain.Recipes;
using poopoo_backend.Repositories.Interfaces;
using poopoo_backend.Shared.Results;

namespace poopoo_backend.Repositories
{
    public class InMemoryRecipeRepository : IRecipeRepository
    {
        // userId -> recipes
        private static readonly ConcurrentDictionary<Guid, List<Recipe>> _store = new();

        public Task<Result> AddAsync(Recipe recipe)
        {
            if (recipe == null)
                return Task.FromResult(new Result(false, FailureReason.ValidationFailed));

            if (recipe.Id == Guid.Empty)
                recipe.Id = Guid.NewGuid();

            var recipes = _store.GetOrAdd(recipe.UserId, _ => new List<Recipe>());

            lock (recipes)
            {
                recipes.Add(recipe);
            }

            return Task.FromResult(new Result(true));
        }

        public Task<Result> AddRangeAsync(IList<Recipe> recipes)
        {
            if (recipes == null || recipes.Count == 0)
                return Task.FromResult(new Result(true));

            foreach (var recipe in recipes)
            {
                if (recipe.Id == Guid.Empty)
                    recipe.Id = Guid.NewGuid();

                var userRecipes = _store.GetOrAdd(recipe.UserId, _ => new List<Recipe>());

                lock (userRecipes)
                {
                    userRecipes.Add(recipe);
                }
            }

            return Task.FromResult(new Result(true));
        }

        public Task<Result<IReadOnlyCollection<Recipe>>> GetRecipesByUserIdAsync(Guid userId)
        {
            if (!_store.TryGetValue(userId, out var recipes))
                return Task.FromResult(
                    new Result<IReadOnlyCollection<Recipe>>(true, Array.Empty<Recipe>())
                );

            lock (recipes)
            {
                return Task.FromResult(
                    new Result<IReadOnlyCollection<Recipe>>(
                        true,
                        recipes.ToList() // defensive copy
                    )
                );
            }
        }

        public Task<Result> RemoveAsync(Guid userId, Guid recipeId)
        {
            if (!_store.TryGetValue(userId, out var recipes))
                return Task.FromResult(new Result(false, FailureReason.NotFound));

            lock (recipes)
            {
                var recipe = recipes.FirstOrDefault(r => r.Id == recipeId);
                if (recipe == null)
                    return Task.FromResult(new Result(false, FailureReason.NotFound));

                recipes.Remove(recipe);
            }

            return Task.FromResult(new Result(true));
        }
    }
}
