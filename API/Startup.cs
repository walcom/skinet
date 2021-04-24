//using API.Data;
using API.Extensions;
using API.Helpers;
using API.Middleware;
using AutoMapper;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        public Startup(IConfiguration configuration)
        {
            this._configuration = configuration;
            //Configuration = configuration;
        }

        //public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddScoped<IProductRepository, ProductRepository>();
            //services.AddScoped((typeof(IGenericRepository<>)), (typeof(GenericRepository<>)));
            services.AddAutoMapper(typeof(MappingProfiles));

            services.AddControllers();

            services.AddDbContext<StoreContext>(x => x.UseSqlite(_configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<AppIdentityDbContext>(x => x.UseSqlite(_configuration.GetConnectionString("IdentityConnection")));

            services.AddSingleton<IConnectionMultiplexer>(c => {
                var configuration = ConfigurationOptions.Parse(_configuration.GetConnectionString("Redis"), true);
                return ConnectionMultiplexer.Connect(configuration);
            });


            /*services.Configure<ApiBehaviorOptions>(options => 
            {
                options.InvalidModelStateResponseFactory = actionContext => 
                {
                    var errors = actionContext.ModelState
                        .Where(e => e.Value.Errors.Count > 0)
                        .SelectMany(x => x.Value.Errors)
                        .Select(x => x.ErrorMessage).ToArray();

                    var errorResponse = new ApiValidationErrorResponse
                    {
                        Errors=errors
                    };

                    return new BadRequestObjectResult(errorResponse);
                };
            });*/

            //TODO
            services.AddApplicationServices();
            services.AddIdentityServices();
            services.AddSwaggerDocumentation();

           /* services.AddSwaggerGen( c => 
            {
                c.SwaggerDoc("v1", new OpenApiInfo{Title="SkiNet API", Version="V1"});
            }); */

            services.AddCors( opt => {
                opt.AddPolicy("CorsPolicy", policy => {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            /*if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }*/
            app.UseMiddleware<ExceptionMiddleware>(); //TODO

            app.UseStatusCodePagesWithReExecute("/errors/{0}"); //TODO


            app.UseRouting();


            app.UseStaticFiles(); // TODO
            app.UseCors("CorsPolicy");
            app.UseHttpsRedirection();


            app.UseAuthorization();

            //TODO: Add swagger 
            app.UseSwaggerDocumentation();
            /*app.UseSwagger();
            app.UseSwaggerUI(c => 
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "SkiNet API v1");
                }); */


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
