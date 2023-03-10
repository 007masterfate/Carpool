using CarPool.Database.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Carpool.Service
{
    public interface IUserService
    {
        User Login(CarPool.Models.Login login);

        bool SignUp(User newUser);

        string GenerateToken(User user);
    }
}
