using Microsoft.AspNetCore.Mvc.Filters;


namespace CarPool.Database.Attributes
{
   public class UserContext:IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            //var claim = context.HttpContext.User.Claims.FirstOrDefault(); 
        }
    }
}
