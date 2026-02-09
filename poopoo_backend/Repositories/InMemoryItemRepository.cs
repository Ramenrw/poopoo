using System.Collections.Concurrent;
using poopoo_backend.Domain.Items;
using poopoo_backend.Repositories.Interfaces;
using poopoo_backend.Shared.Results;

namespace poopoo_backend.Repositories
{
    public sealed class InMemoryItemRepository : IItemRepository
    {
        private readonly ConcurrentDictionary<Guid, Item> _items = new();

        public Task<Result> AddAsync(Item item)
        {
            _items[item.Id] = item;
            return Task.FromResult(new Result(true));
        }

        public Task<IReadOnlyList<Item>> GetByUserAsync(Guid userId)
        {
            var items = _items.Values.Where(item => item.UserId == userId).ToList().AsReadOnly();
            return Task.FromResult((IReadOnlyList<Item>)items);
        }

        public Task<Result> RemoveAsync(Guid pantryItemId)
        {
            _items.TryRemove(pantryItemId, out _);
            return Task.FromResult(new Result(true));
        }
    }
}
