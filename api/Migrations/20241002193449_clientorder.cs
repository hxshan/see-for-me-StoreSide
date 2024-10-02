using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class clientorder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f58819f4-a2ec-494d-a3cf-265ab942d5df");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f7d7eece-1a69-418e-8b2e-a34ccb460ead");

            migrationBuilder.AddColumn<int>(
                name: "ItemRequestId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ItemRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemRequests", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "731a8631-c95e-4bd9-8046-d4cb41530db5", null, "Admin", "ADMIN" },
                    { "c5608c0a-68b4-4fe3-9c30-380d3945a586", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_ItemRequestId",
                table: "Products",
                column: "ItemRequestId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ItemRequests_ItemRequestId",
                table: "Products",
                column: "ItemRequestId",
                principalTable: "ItemRequests",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ItemRequests_ItemRequestId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "ItemRequests");

            migrationBuilder.DropIndex(
                name: "IX_Products_ItemRequestId",
                table: "Products");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "731a8631-c95e-4bd9-8046-d4cb41530db5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c5608c0a-68b4-4fe3-9c30-380d3945a586");

            migrationBuilder.DropColumn(
                name: "ItemRequestId",
                table: "Products");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "f58819f4-a2ec-494d-a3cf-265ab942d5df", null, "User", "USER" },
                    { "f7d7eece-1a69-418e-8b2e-a34ccb460ead", null, "Admin", "ADMIN" }
                });
        }
    }
}
