namespace AutoDashV2.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class vTestRunsFlatModel : DbContext
    {
        public vTestRunsFlatModel()
            : base("name=vTestRunsFlatModel")
        {
        }

        public virtual DbSet<vTestRunsFlat> vTestRunsFlats { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<vTestRunsFlat>()
                .Property(e => e.TestRunGuid)
                .IsUnicode(false);

            modelBuilder.Entity<vTestRunsFlat>()
                .Property(e => e.ExecutedBy)
                .IsUnicode(false);

            modelBuilder.Entity<vTestRunsFlat>()
                .Property(e => e.ApplicationBuildNumber)
                .IsUnicode(false);

            modelBuilder.Entity<vTestRunsFlat>()
                .Property(e => e.Environment)
                .IsUnicode(false);

            modelBuilder.Entity<vTestRunsFlat>()
                .Property(e => e.Browser)
                .IsUnicode(false);

            modelBuilder.Entity<vTestRunsFlat>()
                .Property(e => e.TestName)
                .IsUnicode(false);

            modelBuilder.Entity<vTestRunsFlat>()
                .Property(e => e.TestDescription)
                .IsUnicode(false);

            modelBuilder.Entity<vTestRunsFlat>()
                .Property(e => e.TestRunStatus)
                .IsUnicode(false);
        }
    }
}
