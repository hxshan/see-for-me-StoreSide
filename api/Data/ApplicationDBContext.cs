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
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<FloorMap> FloorMaps { get; set; }
        public DbSet<Tile> Tiles { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Brand> Brands { get; set; }
         public DbSet<ProductType> ProductTypes { get; set; }
         public DbSet<Client> Clients { get; set; }
         public DbSet<ItemRequest> ItemRequests { get; set; }

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

            builder.Entity<Tile>()
            .HasIndex(t => new { t.MapId, t.X, t.Y })
            .IsUnique();


            builder.Entity<FloorMap>()
            .HasMany(fm => fm.Tiles)
            .WithOne(t => t.Map)
            .HasForeignKey(t => t.MapId);


            builder.Entity<Tile>()
            .HasMany(t=>t.Products)
            .WithMany(p => p.Shelves);
            

            builder.Entity<Product>()
            .HasOne(p=>p.Brand)
            .WithMany(p => p.Products)
            .HasForeignKey(p=>p.BrandId);
            
            builder.Entity<Product>()
            .HasOne(p=>p.Type)
            .WithMany()
            .HasForeignKey(p=>p.TypeId);

           builder.Entity<Brand>()
            .HasMany(p=>p.ProductTypes)
            .WithMany(pt => pt.Brands);

        builder.Entity<ItemRequest>()
                .HasKey(ir => ir.Id);  

            builder.Entity<ItemRequestDetail>()
                .HasKey(ird => ird.Id); 

            builder.Entity<ItemRequest>()
                .HasMany(ir => ir.Items)  
                .WithOne(ird => ird.ItemRequest)  
                .HasForeignKey(ird => ird.ItemRequestId); 
        }

         
    }
}