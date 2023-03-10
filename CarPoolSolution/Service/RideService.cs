
using CarPool.Database;
using CarPool.Database.ViewModels;
using CarPool.Models;


namespace Carpool.Service
{
    public class RideService:IRideService
    {
        
        public CarpoolDataBase Database { get; set; }
        public RideService(CarpoolDataBase data)
        {
            Database = data;
        }

        public IEnumerable<Offer> SearchForOffer(BookARide newRide)
        {               
            if (Database.ActiveOffers.Count() == 0) return null;

            if (!CheckUserAvialiblity(newRide.Time, newRide.UserId)) 
            {
                return Database.ActiveOffers.Where(offer => (offer.From == newRide.From || offer.Stops.Contains(((int)newRide.From).ToString())) && (offer.To == newRide.To || offer.Stops.Contains(((int)newRide.To).ToString()))
               && offer.Date == newRide.Date && offer.Time == newRide.Time && offer.SeatsAvailable >0 && offer.From != offer.To && offer.IssuerId != newRide.UserId);

            }
            return null;
               
        }

        public bool PostOffer(OfferRide Offer)
        {
            if (Offer == null) return false;

            if (!CheckUserAvialiblity(Offer.Time,Offer.IssuerId))
            {                                
                Offer data = new Offer() { IssuerId = Offer.IssuerId, OfferId = Offer.OfferId, Date = Offer.Date, Time = Offer.Time, From = Offer.From, To = Offer.To, Price = Offer.Price, SeatsAvailable = Offer.SeatsAvailable, Stops = Offer.Stops };
                Database.ActiveOffers.Add(data);
                Database.SaveChanges();
                return true;
            }
            return false;
        }

        public bool BookaRide(BookARide newRide, int value)
        {
            if (!CheckUserAvialiblity(newRide.Time,newRide.UserId))
            {
                var matchedOffer = Database.ActiveOffers.FirstOrDefault(offer => (offer.From == newRide.From || offer.Stops.Contains(((int)newRide.From).ToString())) && (offer.To == newRide.To || offer.Stops.Contains(((int)newRide.To).ToString()))
                && offer.Date == newRide.Date && offer.Time == newRide.Time && offer.SeatsAvailable >= newRide.SeatsRequired && offer.From != offer.To && offer.IssuerId != newRide.UserId && offer.OfferId == value); ;

                if (matchedOffer == null) return false;

                BookedRide bookedRide = new BookedRide() { Id = newRide.Id, Date = newRide.Date, From = newRide.From, To = newRide.To, Time = newRide.Time, UserId = newRide.UserId };
                matchedOffer.SeatsAvailable -= newRide.SeatsRequired;
                bookedRide.Price = ((int)newRide.To - (int)newRide.From) * 20;
                bookedRide.OfferId = matchedOffer.OfferId;
                bookedRide.SeatsBooked = newRide.SeatsRequired;

                Ride data = new Ride() {From=bookedRide.From,To=bookedRide.To,Date=bookedRide.Date,Time=bookedRide.Time,OfferId=bookedRide.OfferId,Price=bookedRide.Price,SeatsBooked=bookedRide.SeatsBooked,UserId=bookedRide.UserId };
                               
                Database.ActiveRides.Add(data);
                Database.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public IEnumerable<Ride> GetMyRides(int CurrentUserId)
        {
            var matches = Database.ActiveRides.Where(i => i.UserId == CurrentUserId);
            if (matches == null) return null;
            return matches;            
        }

        public IEnumerable<Offer> GetMyOffers(int CurrentUserId)
        {
            var matches = Database.ActiveOffers.Where(i => i.IssuerId == CurrentUserId);
            if (matches == null) return null;
            return matches;
        }

        public IEnumerable<Ride> BookedRides(int OfferID)
        {
            var matchedData = Database.ActiveRides.Where(ride => ride.OfferId == OfferID);
            if (matchedData == null) return null;
            return matchedData;
        }

        public bool CheckUserAvialiblity(string time, int CurrentUserId)
        {
            var checkOfferTimeSlot = Database.ActiveOffers.Any(offer => offer.IssuerId == CurrentUserId && offer.Time == time);
            var checkBookedTimeSlot = Database.ActiveRides.Any(ride => ride.UserId == CurrentUserId && ride.Time == time);
            return checkBookedTimeSlot || checkOfferTimeSlot;            
        }
    }
}
