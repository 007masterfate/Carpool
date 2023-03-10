
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CarPool.Enums;

namespace CarPool.Database.ViewModels
{
    public class Offer
    {
        [Key]
        public int OfferId { get; set; }
        public Stop From { get; set; }
        public Stop To { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public int SeatsAvailable { get; set; }
        public int Price { get; set; }

        [ForeignKey("Users")]
        public int IssuerId { get; set; }
        public string Stops { get; set; }

        public User? User { get; set; }
    }
}
