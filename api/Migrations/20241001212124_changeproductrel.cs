using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class changeproductrel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "ProductTile",
                columns: table => new
                {
                    ProductsId = table.Column<int>(type: "int", nullable: false),
                    ShelvesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductTile", x => new { x.ProductsId, x.ShelvesId });
                    table.ForeignKey(
                        name: "FK_ProductTile_Products_ProductsId",
                        column: x => x.ProductsId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductTile_Tiles_ShelvesId",
                        column: x => x.ShelvesId,
                        principalTable: "Tiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "19babf32-de0f-4605-a9ed-4e5e120464ec", null, "Admin", "ADMIN" },
                    { "5273ba24-6653-4f24-9ee2-bb33047c1fde", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductTile_ShelvesId",
                table: "ProductTile",
                column: "ShelvesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductTile");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "19babf32-de0f-4605-a9ed-4e5e120464ec");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5273ba24-6653-4f24-9ee2-bb33047c1fde");

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
    }
}
