using CarPool.Enums;

namespace CarPool.Models
{
    public class BookARide
    {  
        public int Id { get; set; }
        public Stop From { get; set; }
        public Stop To { get; set; }     
        public string Date { get; set; }
        public string Time { get; set; }
        public int SeatsRequired { get; set; }
        public int UserId { get; set; }
    }
}
