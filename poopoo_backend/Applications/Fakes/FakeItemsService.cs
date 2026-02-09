using Microsoft.AspNetCore.Http;
using poopoo_backend.Applications.Interfaces;
using poopoo_backend.Domain.Items;
using poopoo_backend.Shared.Results;

// FOR TESTING RECIPES GEMINI CALL
namespace poopoo_backend.Applications.Fakes
{
    public sealed class FakeItemsService : IItemsService
    {
        private readonly IReadOnlyCollection<Item> _items;

        public FakeItemsService(IReadOnlyCollection<Item> items)
        {
            _items = items;
        }

        public Task<IReadOnlyCollection<Item>> GetUserItems(Guid userId) => Task.FromResult(_items);

        public Task<Result> UpdateUserItemsAsync(
            Guid userId,
            IFormFile image,
            CancellationToken ct
        ) => Task.FromResult(new Result(true));

        public Task<Result> UpdateUserExpiryDates(Guid userId) => Task.FromResult(new Result(true));

        public Task<Result> ManuallyEnterItemAsync(
            Guid userId,
            string itemName,
            DateTime? expiryDate
        ) => Task.FromResult(new Result(true));

        public Task<Result> ManuallyRemoveItemAsync(Guid userId, Guid itemId) =>
            Task.FromResult(new Result(true));
    }
}
