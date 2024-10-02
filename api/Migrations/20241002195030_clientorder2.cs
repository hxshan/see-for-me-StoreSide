using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class clientorder2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ItemRequests_ItemRequestId",
                table: "Products");

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

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "ItemRequests",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "ItemRequestProduct",
                columns: table => new
                {
                    ItemRequestsId = table.Column<int>(type: "int", nullable: false),
                    ItemsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemRequestProduct", x => new { x.ItemRequestsId, x.ItemsId });
                    table.ForeignKey(
                        name: "FK_ItemRequestProduct_ItemRequests_ItemRequestsId",
                        column: x => x.ItemRequestsId,
                        principalTable: "ItemRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItemRequestProduct_Products_ItemsId",
                        column: x => x.ItemsId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "65c876f4-20d0-4e78-88fc-3c3b719e93dd", null, "Admin", "ADMIN" },
                    { "6633f6c2-e19c-4cbb-bea9-737c3b819528", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItemRequests_UserId",
                table: "ItemRequests",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemRequestProduct_ItemsId",
                table: "ItemRequestProduct",
                column: "ItemsId");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemRequests_Clients_UserId",
                table: "ItemRequests",
                column: "UserId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemRequests_Clients_UserId",
                table: "ItemRequests");

            migrationBuilder.DropTable(
                name: "ItemRequestProduct");

            migrationBuilder.DropIndex(
                name: "IX_ItemRequests_UserId",
                table: "ItemRequests");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "65c876f4-20d0-4e78-88fc-3c3b719e93dd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6633f6c2-e19c-4cbb-bea9-737c3b819528");

            migrationBuilder.AddColumn<int>(
                name: "ItemRequestId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "ItemRequests",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

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
    }
}
