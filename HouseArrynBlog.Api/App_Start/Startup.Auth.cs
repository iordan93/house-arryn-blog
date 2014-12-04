using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Google;
using Microsoft.Owin.Security.OAuth;
using Owin;
using HouseArrynBlog.Api.Providers;
using HouseArrynBlog.Api.Models;
using HouseArrynBlog.Data;
using Microsoft.Owin.Cors;
using System.Web.Cors;
using System.Threading.Tasks;

namespace HouseArrynBlog.Api
{
    public partial class Startup
    {
        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }

        public static string PublicClientId { get; private set; }

        public void ConfigureAuth(IAppBuilder app)
        {
            var tokenCorsPolicy = new CorsPolicy() { AllowAnyOrigin=true, AllowAnyHeader=true, AllowAnyMethod=true };
            var corsOptions = new CorsOptions() 
            {
                PolicyProvider = new CorsPolicyProvider() 
                {
                    PolicyResolver = r => Task.FromResult(r.Path.ToString().StartsWith("/api/token") ? tokenCorsPolicy : null)
                }
            };
            
            app.UseCors(corsOptions);
            
            app.CreatePerOwinContext(() => new HouseArrynBlogContext());
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);

            // Enable the application to use a cookie to store information for the signed in user
            // and to use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Configure the application for OAuth based flow
            PublicClientId = "self";
            OAuthOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/api/Token"),
                Provider = new ApplicationOAuthProvider(PublicClientId),
                AuthorizeEndpointPath = new PathString("/api/Account/ExternalLogin"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(14),
                AllowInsecureHttp = true
            };

            app.UseOAuthBearerTokens(OAuthOptions);
        }
    }
}
