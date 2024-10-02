using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class clientwipe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemRequestProduct");

            migrationBuilder.DropTable(
                name: "ItemRequests");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "65c876f4-20d0-4e78-88fc-3c3b719e93dd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6633f6c2-e19c-4cbb-bea9-737c3b819528");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2e26bdbd-e4d2-443d-9a6e-c1a9a8c689ab", null, "User", "USER" },
                    { "626b4ba3-ae43-4662-b253-93a05682373c", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2e26bdbd-e4d2-443d-9a6e-c1a9a8c689ab");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "626b4ba3-ae43-4662-b253-93a05682373c");

            migrationBuilder.CreateTable(
                name: "ItemRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemRequests_Clients_UserId",
                        column: x => x.UserId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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
                name: "IX_ItemRequestProduct_ItemsId",
                table: "ItemRequestProduct",
                column: "ItemsId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemRequests_UserId",
                table: "ItemRequests",
                column: "UserId");
        }
    }
}
