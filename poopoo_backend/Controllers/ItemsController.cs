using System.Security.Claims;
using Google.GenAI;
using Google.GenAI.Types;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using poopoo_backend.Applications.Interfaces;
using poopoo_backend.Domain.Items;
using poopoo_backend.Repositories.Interfaces;

namespace poopoo_backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemsService _itemsService;
        private Guid CurrentUserId => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        public ItemsController(IItemsService itemsService)
        {
            _itemsService = itemsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserItems()
        {
            var items = await _itemsService.GetUserItems(CurrentUserId);
            return Ok(items);
        }

        [HttpPost("manual-entry")]
        public async Task<IActionResult> ManuallyEnterItem(
            [FromQuery] string itemName,
            [FromQuery] DateTime? expiryDate
        )
        {
            var result = await _itemsService.ManuallyEnterItemAsync(
                CurrentUserId,
                itemName,
                expiryDate
            );
            if (result.Success)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete("manual-remove/{itemId}")]
        public async Task<IActionResult> ManuallyRemoveItem(Guid itemId)
        {
            var result = await _itemsService.ManuallyRemoveItemAsync(CurrentUserId, itemId);
            if (result.Success)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("update-expiry")]
        public async Task<IActionResult> UpdateUserExpiryDates()
        {
            var result = await _itemsService.UpdateUserExpiryDates(CurrentUserId);
            if (result.Success)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("upload-image")]
        public async Task<IActionResult> UpdateUserItems(IFormFile image, CancellationToken ct)
        {
            var result = await _itemsService.UpdateUserItemsAsync(CurrentUserId, image, ct);
            if (result.Success)
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}
