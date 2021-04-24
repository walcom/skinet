using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager){
            if(!userManager.Users.Any()){
                var user = new AppUser{
                    DisplayName = "Waleed Alhasan", 
                    Email = "walcom2kx@gmail.com", 
                    UserName = "walcom2kx@gmail.com", 
                    Address = new Address{
                         FirstName = "Waleed", 
                         LastName = "Alhasan", 
                         Street = "10th", 
                         City = "Dammam", 
                         State = "Eastern", 
                         Zipcode = "33552"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }

}