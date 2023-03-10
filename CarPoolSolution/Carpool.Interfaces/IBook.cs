using CarPool.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Carpool.Interfaces
{
    public interface IBook
    {
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
