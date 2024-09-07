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

        public DbSet<FloorMap> FloorMaps { get; set; }
        public DbSet<Tile> Tiles { get; set; }

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

            builder.Entity<Tile>().HasIndex(t => new { t.MapId, t.X, t.Y }).IsUnique();

            builder.Entity<IdentityRole>().HasData(roles);
            
        }

    }
}