namespace AutoDashV2.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("vTestRunsFlat")]
    public partial class vTestRunsFlat
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(50)]
        public string TestRunGuid { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int TestRunKey { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(50)]
        public string ExecutedBy { get; set; }

        [StringLength(20)]
        public string ApplicationBuildNumber { get; set; }

        [Key]
        [Column(Order = 3)]
        public DateTime StartDateTime { get; set; }

        public DateTime? EndDateTime { get; set; }

        [Key]
        [Column(Order = 4)]
        [StringLength(20)]
        public string Environment { get; set; }

        [StringLength(50)]
        public string Browser { get; set; }

        [Key]
        [Column(Order = 5)]
        [StringLength(50)]
        public string TestName { get; set; }

        [Key]
        [Column(Order = 6)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int TestListKey { get; set; }

        [StringLength(200)]
        public string TestDescription { get; set; }

        [StringLength(20)]
        public string TestRunStatus { get; set; }

        public string Icon { get; set; }
    }
}
