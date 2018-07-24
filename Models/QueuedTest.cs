namespace AutoDashV2.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class QueuedTest
    {
        public int Id { get; set; }

        [Required]
        public string ApplicationName { get; set; }

        [Required]
        public string TestName { get; set; }

        public string UserName { get; set; }

        public DateTime? QueuedDateTime { get; set; }
    }
}
