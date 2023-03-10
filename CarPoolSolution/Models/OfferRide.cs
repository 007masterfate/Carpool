using CarPool.Enums;

namespace CarPool.Models
{    
    public class OfferRide
    {
        public int Id { get; set; }        
        public int OfferId { get; set; }
        public Stop From { get; set; }
        public Stop To { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public int SeatsAvailable { get; set; }
        public int Price { get; set; }
        public int IssuerId { get; set; }
        public string Stops { get; set; }

    }
}
