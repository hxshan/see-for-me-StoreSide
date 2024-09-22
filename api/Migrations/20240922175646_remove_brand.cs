using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class remove_brand : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1b66d998-c411-4496-ba1d-6d976a4997ca");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2a04581a-2dfc-4f76-8972-67b5f14a95aa");

            migrationBuilder.DropColumn(
                name: "Brand",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Products");

            migrationBuilder.AddColumn<int>(
                name: "BrandId",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TypeId",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "BrandProductType",
                columns: table => new
                {
                    BrandsId = table.Column<int>(type: "int", nullable: false),
                    ProductTypesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BrandProductType", x => new { x.BrandsId, x.ProductTypesId });
                    table.ForeignKey(
                        name: "FK_BrandProductType_Brands_BrandsId",
                        column: x => x.BrandsId,
                        principalTable: "Brands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BrandProductType_ProductTypes_ProductTypesId",
                        column: x => x.ProductTypesId,
                        principalTable: "ProductTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "008d3261-afa4-48b5-8aed-81dc6fc2e6d5", null, "User", "USER" },
                    { "77477603-22ed-4baf-b0f3-37fef505d4ba", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_BrandId",
                table: "Products",
                column: "BrandId");

            migrationBuilder.CreateIndex(
                name: "IX_BrandProductType_ProductTypesId",
                table: "BrandProductType",
                column: "ProductTypesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Brands_BrandId",
                table: "Products",
                column: "BrandId",
                principalTable: "Brands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductTypes_BrandId",
                table: "Products",
                column: "BrandId",
                principalTable: "ProductTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Brands_BrandId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductTypes_BrandId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "BrandProductType");

            migrationBuilder.DropIndex(
                name: "IX_Products_BrandId",
                table: "Products");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "008d3261-afa4-48b5-8aed-81dc6fc2e6d5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "77477603-22ed-4baf-b0f3-37fef505d4ba");

            migrationBuilder.DropColumn(
                name: "BrandId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "Brand",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1b66d998-c411-4496-ba1d-6d976a4997ca", null, "User", "USER" },
                    { "2a04581a-2dfc-4f76-8972-67b5f14a95aa", null, "Admin", "ADMIN" }
                });
        }
    }
}
