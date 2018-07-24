namespace AutoDashV2.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class ApplicationNameTestListModel : DbContext
    {
        public ApplicationNameTestListModel()
            : base("name=ApplicationNameTestListModel")
        {
        }

        public virtual DbSet<ApplicationNameTestList> ApplicationNameTestLists { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ApplicationNameTestList>()
                .Property(e => e.ApplicationName)
                .IsUnicode(false);

            modelBuilder.Entity<ApplicationNameTestList>()
                .Property(e => e.TestName)
                .IsUnicode(false);
        }
    }
}
