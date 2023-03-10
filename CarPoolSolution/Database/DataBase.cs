
using Microsoft.EntityFrameworkCore;
using CarPool.Database.ViewModels;

namespace CarPool.Database
{
    public class CarpoolDataBase:DbContext
    {
        public CarpoolDataBase(DbContextOptions<CarpoolDataBase> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Offer> ActiveOffers { get; set; } = null!;
        public DbSet<Ride> ActiveRides { get; set; } = null!;
        
    }

}
