using Microsoft.AspNetCore.Mvc;
using sepending.Application.DTOs;
using sepending.Infrastructure.Repositories;
using sepending.Share;

namespace sepending.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionController : ControllerBase
{
    private readonly ITransactionService _transactionService;

    public TransactionController(ITransactionService transactionService)
    {
        _transactionService = transactionService;
    }
    
    [HttpPost]
    [Route("create")]
    public async Task<Result<int>> CreateTransaction([FromBody] CreateTransactionDto dto, [FromQuery] int userId)
    {
        return await _transactionService.CreateTransaction(userId, dto);
    }
    
    [HttpGet]
    [Route("get-transactions")]
    public async Task<IActionResult> GetTransactions([FromQuery] int userId, [FromQuery] DateTime? from = null, [FromQuery] DateTime? to = null)
    {
        var transactions = await _transactionService.GetTransactions(userId, from, to);
        return Ok(transactions);
    }
    
    [HttpGet]
    [Route("get-total-by-period")]
    public async Task<Result<decimal>> GetTotalByPeriod([FromQuery] int userId, [FromQuery] string type, [FromQuery] DateTime from, [FromQuery] DateTime to)
    {
        return await _transactionService.GetTotalByPeriod(userId, type, from, to);
    }
    
}