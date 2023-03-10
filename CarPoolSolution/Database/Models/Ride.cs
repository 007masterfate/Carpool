using CarPool.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarPool.Database.ViewModels
{
    public class Ride
    {
        [Key]
        public int Id { get; set; }
        public Stop From { get; set; }
        public Stop To { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public int SeatsBooked { get; set; }
        [ForeignKey("ActiveOffers")]
        public int OfferId { get; set; }
        [ForeignKey("Users")]
        public int UserId { get; set; }
        public int Price { get; set; }
        
        public Offer? Offer { get; set; }
        public User? Users { get; set; }
    }
}
