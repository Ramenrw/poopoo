using poopoo_backend.Domain.Items;
using poopoo_backend.Shared.Results;

namespace poopoo_backend.Applications.Interfaces
{
    public interface IItemsService
    {
        Task<Result> UpdateUserItemsAsync(Guid userId, IFormFile image);
        Task<Result> UpdateUserExpiryDates(Guid userId);
        Task<Result> ManuallyEnterItemAsync(Guid userId, string itemName, DateTime? expiryDate);
        Task<Result> ManuallyRemoveItemAsync(Guid userId, Guid itemId);
        Task<IReadOnlyCollection<Item>> GetUserItems(Guid userId);
    }
}
