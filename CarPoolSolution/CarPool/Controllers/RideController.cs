

using CarPool.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Carpool.Service;
using CarPool.Database.ViewModels;


namespace CarPool.Controllers
{
    //[UserContext]
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class RideController:ControllerBase
    {   public IRideService service { get; set; }
        public RideController(IRideService serviceFile)
        {
            service = serviceFile;
        }


        /// <summary>
        /// Find offers which match the description given by the user 
        /// </summary>
        /// <param name="newRide">Input data for searching</param>
        /// <returns>Returns a matched offers </returns>
        [HttpPost("BookRide")]
        public async Task<Response<IEnumerable<Offer>>> SearchForRides(BookARide newRide)
        {

            var matchedRides = service.SearchForOffer(newRide);
            if (matchedRides != null) return new Response<IEnumerable<Offer>>() { Value= matchedRides, IsSuccess=true };
            return new Response<IEnumerable<Offer>>() { IsSuccess=false, Message = "No Offers matched the required parameters !!!" };
        }

        /// <summary>
        /// New Offers by users
        /// </summary>
        /// <param name="Offer">New offer data</param>
        /// <returns>Adds new offer</returns>
        [HttpPost("OfferRide")]    
        public async Task<Response<bool>> PostOffer(OfferRide Offer)
        {
            var statusOfOffer = service.PostOffer(Offer);
            if(statusOfOffer) return new Response<bool> { IsSuccess=true,Message="Offer Success !!!" };
            return new Response<bool> { IsSuccess = false, Message = "User is not available in the specified time slot " };
        }

        /// <summary>
        /// book a offer
        /// </summary>
        /// <param name="newRide"></param>
        /// <param name="Offerid"></param>
        /// <returns>Booking status of an offer</returns>
        [HttpPost("BookRide/{Offerid}")]
        
        public async Task<Response<bool>> BookaRide(BookARide newRide,int Offerid)
        {
            var bookingStatus = service.BookaRide(newRide, Offerid);
            if (bookingStatus) return new Response<bool> { IsSuccess=true,Message="Offer Booked" };
            return new Response<bool> { IsSuccess = false, Message = "User is not available in the specified time slot " };

        }

        /// <summary>
        /// Get the rides booked by the user 
        /// </summary>
        /// <returns>Rides booked</returns>
        [HttpGet("Rides/{userId}")]
        public async Task<Response<IEnumerable<Ride>>> GetMyRides(int userId)
        {
            var rides = service.GetMyRides(userId);
            if (rides == null) return new Response<IEnumerable<Ride>>() { IsSuccess = false, Message = "There are no Rides" };
            return new Response<IEnumerable<Ride>>() {Value = rides,IsSuccess = true};
        }

        /// <summary>
        /// Get the offers booked by the user
        /// </summary>
        /// <returns>Offered rides</returns>
        [HttpGet("offers/{userId}")]        
        
        public async Task<Response<IEnumerable<Offer>>> GetMyOffers(int userId)
        {
            var offers = service.GetMyOffers(userId);
            if (offers == null) return new Response<IEnumerable<Offer>>() { IsSuccess = false, Message = "There are no Rides" };
            return new Response<IEnumerable<Offer>>() { Value = offers, IsSuccess = true };
        }

        /// <summary>
        /// Get the users who have booked the offer 
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Users who booked a ride</returns>
        [HttpGet("ridedetails/{id}")]
        public async Task<Response<IEnumerable<Ride>>> CheckBookedRides(int id)
        {
            var users = service.BookedRides(id);
            if (users == null) return new Response<IEnumerable<Ride>>() { IsSuccess = false, Message = "No User Booked this ride" };
            return new Response<IEnumerable<Ride>> { Value = users, IsSuccess = true };
        }
    }
}
