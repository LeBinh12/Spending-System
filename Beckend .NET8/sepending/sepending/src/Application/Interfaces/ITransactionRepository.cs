using sepending.Domain.Entities;

namespace sepending.Infrastructure.Repositories;

public interface ITransactionRepository
{
    Task<Transaction?> GetById(int id, int userId);
    Task<IEnumerable<Transaction>> GetByUser(int userId, DateTime? from = null, DateTime? to = null);
    Task<decimal> SumAmount(int userId, string type, DateTime from, DateTime to, int? categoryId);
    Task<Transaction> Add(Transaction transaction);
    Task Update(Transaction transaction);
    Task Delete(Transaction transaction);
}