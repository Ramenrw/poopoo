using poopoo_backend.Domain.Items;
using poopoo_backend.Shared.Results;

namespace poopoo_backend.Repositories.Interfaces
{
    public interface IItemRepository
    {
        Task<Result> AddAsync(Item item);
        Task<IReadOnlyList<Item>> GetByUserAsync(Guid userId);
        Task<Result> RemoveAsync(Guid pantryItemId);
    }
}
