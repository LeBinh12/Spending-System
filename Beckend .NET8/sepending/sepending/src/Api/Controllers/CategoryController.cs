using Microsoft.AspNetCore.Mvc;
using sepending.Application.DTOs;
using sepending.Infrastructure.Repositories;
using sepending.Share;

namespace sepending.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _service;

    public CategoryController(ICategoryService service)
    {
        _service = service;
    }
    
    private int CurrentUserId => 1;

    [HttpGet("get-all")]
    public async Task<IActionResult> GetAll(int userId)
    {
        var categories = await _service.GetAll(userId);
        return Ok(categories);
    }

    [HttpGet]
    [Route("get-by-id/{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var category = await _service.GetById(id, CurrentUserId);
        if (category == null) return NotFound(Result<string>.Failure("Loại này không tồn tại"));
        return Ok(category);
    }

    [HttpPost("create")]
    public async Task<Result<int>> Create([FromBody] CreateCategoryDto dto)
    {
        return await _service.Create(dto, CurrentUserId);
    }

    [HttpPost("update/{id}")]
    public async Task<Result<int>> Update(int id , [FromBody] UpdateCategoryDto dto)
    {
        return await _service.Update(id, dto, CurrentUserId);
    }

    [HttpPost("delete/{id}")]
    public async Task<Result<int>> Delete(int id)
    {
        return await _service.Delete(id, CurrentUserId);
    }
}