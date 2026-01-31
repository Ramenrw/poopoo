using poopoo_backend.Domain.Items;

namespace poopoo_backend.Repositories.Interfaces
{
    public interface IItemRepository
    {
        Task AddAsync(Guid userId, Item item);
        Task<IReadOnlyList<Item>> GetByUserAsync(Guid userId);
        Task RemoveAsync(Guid pantryItemId);
    }
}
