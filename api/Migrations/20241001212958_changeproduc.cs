using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class changeproduc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "19babf32-de0f-4605-a9ed-4e5e120464ec");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5273ba24-6653-4f24-9ee2-bb33047c1fde");

            migrationBuilder.DropColumn(
                name: "ShelfId",
                table: "Products");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a6bf4314-c3f3-4c9a-8202-47a4b9fcc2cf", null, "User", "USER" },
                    { "a8f2418c-54e0-4f8e-b8fe-f2012bbd4bed", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a6bf4314-c3f3-4c9a-8202-47a4b9fcc2cf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a8f2418c-54e0-4f8e-b8fe-f2012bbd4bed");

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
                    { "19babf32-de0f-4605-a9ed-4e5e120464ec", null, "Admin", "ADMIN" },
                    { "5273ba24-6653-4f24-9ee2-bb33047c1fde", null, "User", "USER" }
                });
        }
    }
}
