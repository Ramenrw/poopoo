using poopoo_backend.Applications.Interfaces;
using poopoo_backend.Domain.Items;
using poopoo_backend.Infrastructure.Gemini;
using poopoo_backend.Repositories.Interfaces;
using poopoo_backend.Shared.Results;

namespace poopoo_backend.Applications
{
    public class ItemsService : IItemsService
    {
        private readonly IItemRepository _itemRepo;
        private readonly GeminiClient _gemini;

        public ItemsService(IItemRepository itemRepo, GeminiClient gemini)
        {
            _itemRepo = itemRepo;
            _gemini = gemini;
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

        public async Task<Result> UpdateUserItemsAsync(
            Guid userId,
            IFormFile image,
            CancellationToken ct = default
        )
        {
            if (image.Length > 5_000_000)
                return new Result(false, FailureReason.ValidationFailed);

            await using var stream = image.OpenReadStream();

            var res = await _gemini.UploadImageAsync(stream, image.ContentType, ct);

            var detectedItems = res.Data;
            if (detectedItems == null || detectedItems.Length == 0)
            {
                return new Result(false, FailureReason.NotFound);
            }

            foreach (DetectedItemDto i in detectedItems)
            {
                await _itemRepo.AddAsync(
                    new Item()
                    {
                        Id = Guid.NewGuid(),
                        UserId = userId,
                        Name = i.Name,
                        Category = i.Category,
                        Quantity = i.Quantity,
                        DetectedConfidence = i.DetectedConfidence,
                        ExpirationDate = i.ExpirationDate,
                        RecordedAt = DateTime.UtcNow,
                    }
                );
            }

            return new Result(true);
        }
    }
}
