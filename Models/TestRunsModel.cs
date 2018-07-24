namespace AutoDashV2.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class TestRunsModel : DbContext
    {
        public TestRunsModel()
            : base("name=TestRunsModel")
        {
        }

        public virtual DbSet<TestRun> TestRuns { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TestRun>()
                .Property(e => e.TestRunGuid)
                .IsUnicode(false);

            modelBuilder.Entity<TestRun>()
                .Property(e => e.Environment)
                .IsUnicode(false);

            modelBuilder.Entity<TestRun>()
                .Property(e => e.Browser)
                .IsUnicode(false);

            modelBuilder.Entity<TestRun>()
                .Property(e => e.TestRunStatus)
                .IsUnicode(false);

            modelBuilder.Entity<TestRun>()
                .Property(e => e.ApplicationBuildNumber)
                .IsUnicode(false);

            modelBuilder.Entity<TestRun>()
                .Property(e => e.TestBuildNumber)
                .IsUnicode(false);
        }
    }
}
