using Google.GenAI;
using Google.GenAI.Types;
using poopoo_backend.Domain.Items;
using poopoo_backend.Repositories.Interfaces;

namespace poopoo_backend.Controllers
{
    public class ItemsController : IItemRepository
    {
        public Task AddAsync(Item item)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyList<Item>> GetByUserAsync(Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task RemoveAsync(Guid pantryItemId)
        {
            throw new NotImplementedException();
        }
    }
}
