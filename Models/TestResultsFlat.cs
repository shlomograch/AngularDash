namespace AutoDashV2.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("TestResultsFlat")]
    public partial class TestResultsFlat
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int TestRunKey { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int TestResultKey { get; set; }

        [StringLength(800)]
        public string Expected { get; set; }

        [StringLength(800)]
        public string Actual { get; set; }

        [StringLength(20)]
        public string ResultStatus { get; set; }

        public string ExtraData { get; set; }
    }
}
