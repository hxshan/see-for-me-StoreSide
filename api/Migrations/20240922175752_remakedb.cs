using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class remakedb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78a50a39-bbdb-41e4-9498-94eddfd83c99");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "de55608e-d5eb-4c97-ab0b-f92d910ae6a7");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0d940d4d-a065-47a8-9105-8bbed0be4db7", null, "Admin", "ADMIN" },
                    { "d8cf2f9f-f406-43e3-a04c-19fa25deb3df", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0d940d4d-a065-47a8-9105-8bbed0be4db7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d8cf2f9f-f406-43e3-a04c-19fa25deb3df");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "78a50a39-bbdb-41e4-9498-94eddfd83c99", null, "User", "USER" },
                    { "de55608e-d5eb-4c97-ab0b-f92d910ae6a7", null, "Admin", "ADMIN" }
                });
        }
    }
}
