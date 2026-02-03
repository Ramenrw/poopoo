using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using poopoo_backend.Applications.Interfaces;
using poopoo_backend.Shared.DTOs;

namespace poopoo_backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly IRecipesService _recipesService;
        private Guid CurrentUserId => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        public RecipesController(IRecipesService recipesService)
        {
            _recipesService = recipesService;
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

        [HttpGet("generate")]
        public async Task<IActionResult> GenerateRecipesForUser()
        {
            var recipes = await _recipesService.GenerateRecipesForUser(CurrentUserId);
            return Ok(recipes);
        }
    }
}
