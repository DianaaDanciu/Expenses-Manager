namespace ExpensesAPI.Migrations
{
    using ExpensesAPI.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ExpensesAPI.Data.AppDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ExpensesAPI.Data.AppDbContext context)
        {
            context.Entries.Add(new Entry() { Description = "tets", IsExpense = false, Value = 10.11 });
        }
    }
}
