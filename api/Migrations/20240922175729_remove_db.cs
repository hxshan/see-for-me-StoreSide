using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class remove_db : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "008d3261-afa4-48b5-8aed-81dc6fc2e6d5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "77477603-22ed-4baf-b0f3-37fef505d4ba");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "78a50a39-bbdb-41e4-9498-94eddfd83c99", null, "User", "USER" },
                    { "de55608e-d5eb-4c97-ab0b-f92d910ae6a7", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "008d3261-afa4-48b5-8aed-81dc6fc2e6d5", null, "User", "USER" },
                    { "77477603-22ed-4baf-b0f3-37fef505d4ba", null, "Admin", "ADMIN" }
                });
        }
    }
}
