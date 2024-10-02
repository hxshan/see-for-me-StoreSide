using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class usertypec : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "225dd4f0-111a-40b9-a0c1-ac732d642449");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "29fb434e-3eb8-43d7-b3cc-c80042a552c3");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "ItemRequests",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "452716bb-c4b5-4767-8010-ddf68a0e8abc", null, "User", "USER" },
                    { "ec995828-7a63-4e4f-b71b-a3858e6b95b6", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "452716bb-c4b5-4767-8010-ddf68a0e8abc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ec995828-7a63-4e4f-b71b-a3858e6b95b6");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "ItemRequests",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "225dd4f0-111a-40b9-a0c1-ac732d642449", null, "Admin", "ADMIN" },
                    { "29fb434e-3eb8-43d7-b3cc-c80042a552c3", null, "User", "USER" }
                });
        }
    }
}
