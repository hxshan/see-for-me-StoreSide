using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class changeprod : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a6bf4314-c3f3-4c9a-8202-47a4b9fcc2cf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a8f2418c-54e0-4f8e-b8fe-f2012bbd4bed");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "71aba412-6983-4b44-9442-17ba272b70b0", null, "User", "USER" },
                    { "ee881999-5049-43da-acee-5196d88da7a5", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "71aba412-6983-4b44-9442-17ba272b70b0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ee881999-5049-43da-acee-5196d88da7a5");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a6bf4314-c3f3-4c9a-8202-47a4b9fcc2cf", null, "User", "USER" },
                    { "a8f2418c-54e0-4f8e-b8fe-f2012bbd4bed", null, "Admin", "ADMIN" }
                });
        }
    }
}
