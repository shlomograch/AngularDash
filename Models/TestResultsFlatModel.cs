namespace AutoDashV2.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class TestResultsFlatModel : DbContext
    {
        public TestResultsFlatModel()
            : base("name=TestResultsFlatModel")
        {
        }

        public virtual DbSet<TestResultsFlat> TestResultsFlats { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TestResultsFlat>()
                .Property(e => e.Expected)
                .IsUnicode(false);

            modelBuilder.Entity<TestResultsFlat>()
                .Property(e => e.Actual)
                .IsUnicode(false);

            modelBuilder.Entity<TestResultsFlat>()
                .Property(e => e.ResultStatus)
                .IsUnicode(false);

            modelBuilder.Entity<TestResultsFlat>()
                .Property(e => e.ExtraData)
                .IsUnicode(false);
        }
    }
}
