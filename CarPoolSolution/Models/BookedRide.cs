
using CarPool.Enums;

namespace CarPool.Models
{
    public class BookedRide
    {        
        public int Id { get; set; }
        public Stop From { get; set; }
        public Stop To { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public int SeatsBooked { get; set; }
        public int OfferId { get; set; }
        public int UserId { get; set; }
        public int Price { get; set; }
    }
}
