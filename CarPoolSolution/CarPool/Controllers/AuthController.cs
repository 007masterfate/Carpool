
using Carpool.Service;
using CarPool.Database;
using CarPool.Database.ViewModels;
using CarPool.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;



namespace CarPool.Controllers
{
    
    [Route("/")]
    [ApiController]
    public class AuthController:ControllerBase
    {
        
        public IUserService UserService { get; set; }
        public CarpoolDataBase Database { get; set; }

        
        public AuthController(IUserService service,CarpoolDataBase data)
        {
            UserService = service;
            Database = data;            
        }

        /// <summary>
        /// Login the user and genereate a jwt token if the user is validated
        /// </summary>
        /// <param name="login"></param>
        /// <returns>Status of Login</returns>
        [HttpPost("Login")] 
        public async Task<Response<string>> Login(Login login)
        {
            var User = UserService.Login(login);
            if (User == null) return new Response<string>() { IsSuccess = false,Message="User not present in Database" };
            return new Response<string>() { Value = UserService.GenerateToken(User), IsSuccess = true };
        }

        /// <summary>
        /// Add new User
        /// </summary>
        /// <param name="newUser"></param>
        /// <returns>Status of signup </returns>
        [HttpPost("Signup")]       
        public async Task<Response<Database.ViewModels.User>> SignUp(Database.ViewModels.User newUser)
        {
            var user = UserService.SignUp(newUser);
            if (user) return new Response<Database.ViewModels.User>() { IsSuccess = true};
            return new Response<Database.ViewModels.User>() { IsSuccess = false, Message = "User already present in database" };

        }

        /// <summary>
        /// Getting the user with their id
        /// </summary>
        /// <param name="id"></param>
        /// <returns> Returns users </returns>
        [HttpGet("User/{id}")]
        public async Task<Response<Database.ViewModels.User>> GetUser(int id){
            var usersList = Database.Users.FirstOrDefault(users => users.Id == id);
            if(usersList!=null) return new Response<Database.ViewModels.User>() { Value= usersList, IsSuccess=true };
            return new Response<Database.ViewModels.User>() { Value = null, Message = "No Users Matched", IsSuccess = false };
        }   
        
    }
}
