using Microsoft.EntityFrameworkCore;
using sepending.Domain.Entities;

namespace sepending.Infrastructure.Data;

public class ExpenseDbContext : DbContext
{
    
    public  ExpenseDbContext(DbContextOptions<ExpenseDbContext> options) : base(options){}
    
    public DbSet<Category> Categories { get; set; } = null!;
    public DbSet<Transaction> Transactions { get; set; } = null!;
    public DbSet<Budget> Budgets { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToTable("categories"); // tên table trong DB

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Name).HasColumnName("name").IsRequired();
            entity.Property(e => e.Type).HasColumnName("type").IsRequired();
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.ToTable("transactions");
            entity.HasKey(e => e.id);

            entity.Property(e => e.id).HasColumnName("id");
            entity.Property(e => e.user_id).HasColumnName("user_id");
            entity.Property(e => e.category_id).HasColumnName("category_id");
            entity.Property(e => e.amount).HasColumnName("amount");
            entity.Property(e => e.type).HasColumnName("type");
            entity.Property(e => e.transaction_date).HasColumnName("transaction_date").HasColumnType("date");
            entity.Property(e => e.note).HasColumnName("note");
            entity.Property(e => e.created_at).HasColumnName("created_at");

            entity.HasOne(e => e.Category)
                .WithMany()
                .HasForeignKey(e => e.category_id)
                .OnDelete(DeleteBehavior.Cascade);
        });

        
        modelBuilder.Entity<Budget>(entity =>
        {
            entity.ToTable("budgets");
            entity.HasKey(b => b.id);

            entity.Property(b => b.id).HasColumnName("id");
            entity.Property(b => b.user_id).HasColumnName("user_id").IsRequired();
            entity.Property(b => b.category_id).HasColumnName("category_id").IsRequired();
            entity.Property(b => b.amount).HasColumnName("amount").HasColumnType("decimal(18,2)").IsRequired();
            entity.Property(b => b.period).HasColumnName("period").HasMaxLength(20).IsRequired();
            entity.Property(b => b.start_date).HasColumnName("start_date").HasColumnType("date");
            entity.Property(b => b.end_date).HasColumnName("end_date").HasColumnType("date");
            entity.Property(b => b.created_at).HasColumnName("created_at").HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(b => b.Category)
                .WithMany()
                .HasForeignKey(b => b.category_id)
                .OnDelete(DeleteBehavior.Cascade);
            
            entity.Property(b => b.start_date)
                .HasColumnName("start_date")
                .HasColumnType("timestamptz");

            entity.Property(b => b.end_date)
                .HasColumnName("end_date")
                .HasColumnType("timestamptz");

        });

    }
        
}