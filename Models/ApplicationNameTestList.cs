namespace AutoDashV2.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ApplicationNameTestList")]
    public partial class ApplicationNameTestList
    {
        [StringLength(50)]
        public string ApplicationName { get; set; }

        [Key]
        [Column(Order = 0)]
        [StringLength(50)]
        public string TestName { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int TestListKey { get; set; }
    }
}
