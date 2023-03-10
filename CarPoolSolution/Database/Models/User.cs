using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;


namespace CarPool.Database.ViewModels
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string? Name { get; set; }

        [ForeignKey("IssuerId")]
        public ICollection<Offer>? Offers { get; set; }
        [ForeignKey("UserId")]
        public ICollection<Ride>? Rides { get; set; }
    }
}
