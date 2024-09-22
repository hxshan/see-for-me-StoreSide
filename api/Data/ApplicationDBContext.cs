using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext:IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions):base(dbContextOptions)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            List<IdentityRole> roles = new List<IdentityRole>{
                new IdentityRole{
                    Name ="Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole{
                    Name="User",
                    NormalizedName ="USER"
                },

            };
            builder.Entity<IdentityRole>().HasData(roles);

            // builder.Entity<Product>()
            // .HasOne(p=>p.Brand)
            // .WithMany(b=>b.Products)
            // .HasForeignKey(p=>p.BrandId);
            
        }

         public DbSet<Product> Products { get; set; }
        public DbSet<Brand> Brands { get; set; }
         public DbSet<ProductType> ProductTypes { get; set; }

    }
}