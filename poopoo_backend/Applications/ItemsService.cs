using poopoo_backend.Applications.Interfaces;
using poopoo_backend.Domain.Items;
using poopoo_backend.Repositories.Interfaces;
using poopoo_backend.Shared.Results;

namespace poopoo_backend.Applications
{
    public class ItemsService : IItemsService
    {
        private readonly IItemRepository _itemRepo;

        public ItemsService(IItemRepository itemRepo)
        {
            _itemRepo = itemRepo;
        }

        public async Task<IReadOnlyCollection<Item>> GetUserItems(Guid userId)
        {
            return await _itemRepo.GetByUserAsync(userId);
        }

        public async Task<Result> ManuallyEnterItemAsync(
            Guid userId,
            string itemName,
            DateTime? expiryDate
        )
        {
            Item item = new Item()
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Name = itemName,
                RecordedAt = DateTime.UtcNow,
                ExpirationDate = expiryDate,
            };

            var res = await _itemRepo.AddAsync(item);
            return res;
        }

        public async Task<Result> ManuallyRemoveItemAsync(Guid userId, Guid itemId)
        {
            var res = await _itemRepo.RemoveAsync(itemId);

            return res;
        }

        public async Task<Result> UpdateUserExpiryDates(Guid userId)
        {
            var res = await _itemRepo.GetByUserAsync(userId);
            foreach (Item i in res)
            {
                if (i.ExpirationDate.HasValue && i.ExpirationDate.Value < DateTime.UtcNow)
                {
                    await _itemRepo.RemoveAsync(i.Id);
                }
            }

            return new Result(true);
        }

        public Task<Result> UpdateUserItemsAsync(Guid userId, IFormFile image)
        {
            throw new NotImplementedException();
        }
    }
}
