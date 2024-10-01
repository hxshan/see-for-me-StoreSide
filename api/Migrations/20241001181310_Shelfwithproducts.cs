using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class Shelfwithproducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "67f4a46a-e1e2-493f-acf8-f4820a2ff49d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8549d7e8-13ee-40e4-8381-e32dbdca1419");

            migrationBuilder.AddColumn<int>(
                name: "ShelfId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "59d9dd8b-5deb-47e6-b17f-203971bccb4a", null, "Admin", "ADMIN" },
                    { "eefa5264-2c76-4eae-b983-e8f3cd4220a7", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_ShelfId",
                table: "Products",
                column: "ShelfId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Tiles_ShelfId",
                table: "Products",
                column: "ShelfId",
                principalTable: "Tiles",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Tiles_ShelfId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_ShelfId",
                table: "Products");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "59d9dd8b-5deb-47e6-b17f-203971bccb4a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eefa5264-2c76-4eae-b983-e8f3cd4220a7");

            migrationBuilder.DropColumn(
                name: "ShelfId",
                table: "Products");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "67f4a46a-e1e2-493f-acf8-f4820a2ff49d", null, "Admin", "ADMIN" },
                    { "8549d7e8-13ee-40e4-8381-e32dbdca1419", null, "User", "USER" }
                });
        }
    }
}
