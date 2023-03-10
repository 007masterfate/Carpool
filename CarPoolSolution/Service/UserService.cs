using CarPool.Database;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using CarPool.Database.ViewModels;

namespace Carpool.Service
{
    public class UserService : IUserService
    {
        public IConfiguration Configuration;
        public CarpoolDataBase Database { get; set; }

        public UserService(CarpoolDataBase data, IConfiguration config)
        {
            Database = data;
            Configuration = config;
        }

        public User Login(CarPool.Models.Login login)
        {
            var checkUser = Database.Users.FirstOrDefault(i => i.Username == login.UserName && i.Password == login.Password);
            if (checkUser == null) return null;
            return checkUser;
        }

        

        public string GenerateToken(CarPool.Database.ViewModels.User user)
        {   
                   
            var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, Configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.Now.ToString()),
                        new Claim("UserId", user.Id.ToString()),
                        new Claim("UserName", user.Username),
                    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                Configuration["Jwt:Issuer"],
                Configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: signIn);
            string jwtToken= new JwtSecurityTokenHandler().WriteToken(token);
            string resultantString = jwtToken+user.Id.ToString();
            return resultantString;
        }

        public bool SignUp(User newUser)
        {
            var isUserPresent = Database.Users.FirstOrDefault(i => i.Username == newUser.Username);
            if (isUserPresent != null) return false;
            CarPool.Database.ViewModels.User data = new CarPool.Database.ViewModels.User() { Id = newUser.Id, Username = newUser.Username, Password = newUser.Password, Name = newUser.Name };
            Database.Users.Add(data);
            Database.SaveChangesAsync();
            return true;
        }

        
    }
}
