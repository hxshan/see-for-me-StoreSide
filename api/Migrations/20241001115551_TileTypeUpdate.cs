using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class TileTypeUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7cd963d2-7fcf-4c2d-9dc7-d7eb3334bac9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a4aeb21a-da72-4754-9658-b8b678d23ae8");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b5d06f9b-a6d1-4c7a-922b-59e017d01311", null, "Admin", "ADMIN" },
                    { "eb63b103-6cc3-4e86-85bd-9653769521b6", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b5d06f9b-a6d1-4c7a-922b-59e017d01311");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eb63b103-6cc3-4e86-85bd-9653769521b6");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7cd963d2-7fcf-4c2d-9dc7-d7eb3334bac9", null, "Admin", "ADMIN" },
                    { "a4aeb21a-da72-4754-9658-b8b678d23ae8", null, "User", "USER" }
                });
        }
    }
}
