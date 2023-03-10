using CarPool.Database.ViewModels;
using CarPool.Models;


namespace Carpool.Service
{
    public interface IRideService
    {
        IEnumerable<Offer> SearchForOffer(BookARide newRide);

        bool PostOffer(OfferRide Offer);

        bool BookaRide(BookARide newRide, int value);

        IEnumerable<Ride> GetMyRides(int CurrentUserId);

        IEnumerable<Offer> GetMyOffers(int CurrentUserId);

        IEnumerable<Ride> BookedRides(int OfferID);
    }

}
