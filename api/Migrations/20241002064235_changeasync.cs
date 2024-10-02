using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class changeasync : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a4aa13fa-7b89-4eef-a84f-b4f8812ae39f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ca3cddf1-6675-44e6-93c3-fbc47f52c574");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1dcff027-5fd3-4ca6-a708-ec87cf97d842", null, "User", "USER" },
                    { "5db20aee-62bd-4462-b4bc-81a02f72da2d", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1dcff027-5fd3-4ca6-a708-ec87cf97d842");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5db20aee-62bd-4462-b4bc-81a02f72da2d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a4aa13fa-7b89-4eef-a84f-b4f8812ae39f", null, "User", "USER" },
                    { "ca3cddf1-6675-44e6-93c3-fbc47f52c574", null, "Admin", "ADMIN" }
                });
        }
    }
}
