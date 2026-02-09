using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using poopoo_backend.Applications.Interfaces;
using poopoo_backend.Shared.DTOs;

namespace poopoo_backend.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly IRecipesService _recipesService;
        private readonly ILogger<RecipesController> _logger;
        private Guid CurrentUserId => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        public RecipesController(IRecipesService recipesService, ILogger<RecipesController> logger)
        {
            _recipesService = recipesService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserRecipes()
        {
            var recipes = await _recipesService.GetSavedRecipesForUser(CurrentUserId);
            return Ok(recipes);
        }

        [HttpPost]
        public async Task<IActionResult> SaveRecipeForUser([FromBody] RecipeDTO recipe)
        {
            var result = await _recipesService.SaveRecipeForUser(CurrentUserId, recipe);
            if (!result.Success)
            {
                return BadRequest();
            }
            return Ok();
        }

        [HttpDelete("{recipeId}")]
        public async Task<IActionResult> RemoveRecipeForUser(Guid recipeId)
        {
            var result = await _recipesService.RemoveSavedRecipeForUser(CurrentUserId, recipeId);
            if (!result.Success)
            {
                return BadRequest();
            }
            return Ok();
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateRecipesForUser()
        {
            _logger.LogInformation(
                "ENTER generate. Authenticated={Auth}",
                User.Identity?.IsAuthenticated
            );
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            _logger.LogInformation("Claim nameid={Claim}", userIdClaim);
            var recipes = await _recipesService.GenerateRecipesForUser(Guid.Parse(userIdClaim!));

            _logger.LogInformation(
                "EXIT generate. Count={Count}",
                recipes.Success ? recipes.Data?.Count : -1
            );
            return Ok(recipes);
        }

        [HttpGet("ok")]
        public async Task<IActionResult> CloudrunTest()
        {
            return Ok();
        }
    }
}
