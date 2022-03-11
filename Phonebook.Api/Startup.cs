using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using PhonebookAPI.Model;
using PhonebookAPI.Repo;
using PhonebookAPI.Services;
using System;
using System.Linq;
using System.Net.Mime;
using System.Text.Json;

namespace PhonebookAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var server = Configuration["Server"] ?? "";
            var port = Configuration["Port"] ?? "";
            var user = Configuration["User"] ?? "";
            var password = Configuration["Password"] ?? "";
            var database = Configuration["Database"] ?? "";
#if DEBUG


            var connectionString = $"Server=localhost\\MSSQLSERVER01; Initial Catalog={database}; User ID=spheretech; Password=EasyRD/1V3";
#else
            var connectionString = $"Server={server}, {port}; Initial Catalog={database}; User ID={user}; Password={password}";
#endif
            services.AddDbContext<PhonebookContext>(options => options.UseSqlServer(connectionString));
            services.AddTransient<IContact, ContactRepo>();
            services.AddControllersWithViews(options => options.SuppressAsyncSuffixInActionNames = false);


            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            services.AddHealthChecks().AddSqlServer(connectionString, name: "sqlserver", timeout: TimeSpan.FromSeconds(3));
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "PhonebookAPI", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            DatabaseManagementService.MigrationInitialisation(app);
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();


            app.UseRouting();

            app.UseAuthorization();


            app.UseSpaStaticFiles();
            app.UseSpa(spa =>
             {
                 spa.Options.SourcePath = "ClientApp";
                 if (env.IsDevelopment())
                 {
                     spa.Options.StartupTimeout = TimeSpan.FromSeconds(120);
                     spa.UseProxyToSpaDevelopmentServer("http://localhost:8000");
                 }
                 else
                 {

                 }

             });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHealthChecks("/health/ready", new HealthCheckOptions
                {
                    Predicate = (check) => check.Tags.Contains("ready"),
                    ResponseWriter = async (context, report) =>
                    {
                        var result = JsonSerializer.Serialize(
                        new
                        {
                            status = report.Status.ToString(),
                            check = report.Entries.Select(entry => new
                            {
                                name = entry.Key,
                                status = entry.Value.Status.ToString(),
                                exception = entry.Value.Exception != null ? entry.Value.Exception.Message : "none",
                                duration = entry.Value.Duration.ToString()
                            })
                        });

                        context.Response.ContentType = MediaTypeNames.Application.Json;
                        await context.Response.WriteAsync(result);
                    }
                });

                endpoints.MapHealthChecks("/health/live", new HealthCheckOptions
                {
                    Predicate = (_) => false
                });


            });
        }
    }
}
