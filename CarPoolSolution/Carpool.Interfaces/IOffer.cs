using CarPool.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Carpool.Interfaces
{
    public interface IOffer
    {
        int OfferId { get; set; }
        Stop From { get; set; }
        Stop To { get; set; }
        string Date { get; set; }
        string Time { get; set; }
        int SeatsAvailable { get; set; }
        int Price { get; set; }
        int IssuerId { get; set; }
        string Stops { get; set; }
    }
}
