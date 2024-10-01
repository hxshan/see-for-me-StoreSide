using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class changeproductmodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b5d06f9b-a6d1-4c7a-922b-59e017d01311");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eb63b103-6cc3-4e86-85bd-9653769521b6");

            migrationBuilder.AddColumn<string>(
                name: "Unit",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "67f4a46a-e1e2-493f-acf8-f4820a2ff49d", null, "Admin", "ADMIN" },
                    { "8549d7e8-13ee-40e4-8381-e32dbdca1419", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "67f4a46a-e1e2-493f-acf8-f4820a2ff49d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8549d7e8-13ee-40e4-8381-e32dbdca1419");

            migrationBuilder.DropColumn(
                name: "Unit",
                table: "Products");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b5d06f9b-a6d1-4c7a-922b-59e017d01311", null, "Admin", "ADMIN" },
                    { "eb63b103-6cc3-4e86-85bd-9653769521b6", null, "User", "USER" }
                });
        }
    }
}
