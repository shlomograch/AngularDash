namespace AutoDashV2.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class TestRun
    {
        [Key]
        public int TestRunKey { get; set; }

        [Required]
        [StringLength(50)]
        public string TestRunGuid { get; set; }

        public int TestKey { get; set; }

        public int TesterKey { get; set; }

        public int ApplicationKey { get; set; }

        [Required]
        [StringLength(20)]
        public string Environment { get; set; }

        [StringLength(50)]
        public string Browser { get; set; }

        public DateTime StartDateTime { get; set; }

        public DateTime? EndDateTime { get; set; }

        [StringLength(20)]
        public string TestRunStatus { get; set; }

        public int? ParentTestRunKey { get; set; }

        [StringLength(20)]
        public string ApplicationBuildNumber { get; set; }

        [StringLength(20)]
        public string TestBuildNumber { get; set; }

        public int? TestCategoryKey { get; set; }
    }
}
