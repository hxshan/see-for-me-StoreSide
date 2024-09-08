using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class maprelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "178c9bf2-ef71-47ea-b7e1-94c60a622291");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e1e3a5fd-383c-484d-a1a1-74d7b3f14ef2");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1c489351-2ad1-4df8-83f2-772e87b54f08", null, "User", "USER" },
                    { "b6892390-7d18-46f0-8623-181c3fbf5a32", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1c489351-2ad1-4df8-83f2-772e87b54f08");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b6892390-7d18-46f0-8623-181c3fbf5a32");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "178c9bf2-ef71-47ea-b7e1-94c60a622291", null, "Admin", "ADMIN" },
                    { "e1e3a5fd-383c-484d-a1a1-74d7b3f14ef2", null, "User", "USER" }
                });
        }
    }
}
