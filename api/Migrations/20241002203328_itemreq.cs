using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class itemreq : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ClientId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemRequests_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ItemRequestDetail",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    ItemRequestId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemRequestDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemRequestDetail_ItemRequests_ItemRequestId",
                        column: x => x.ItemRequestId,
                        principalTable: "ItemRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItemRequestDetail_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "225dd4f0-111a-40b9-a0c1-ac732d642449", null, "Admin", "ADMIN" },
                    { "29fb434e-3eb8-43d7-b3cc-c80042a552c3", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItemRequestDetail_ItemRequestId",
                table: "ItemRequestDetail",
                column: "ItemRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemRequestDetail_ProductId",
                table: "ItemRequestDetail",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemRequests_ClientId",
                table: "ItemRequests",
                column: "ClientId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemRequestDetail");

            migrationBuilder.DropTable(
                name: "ItemRequests");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "225dd4f0-111a-40b9-a0c1-ac732d642449");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "29fb434e-3eb8-43d7-b3cc-c80042a552c3");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2e26bdbd-e4d2-443d-9a6e-c1a9a8c689ab", null, "User", "USER" },
                    { "626b4ba3-ae43-4662-b253-93a05682373c", null, "Admin", "ADMIN" }
                });
        }
    }
}
