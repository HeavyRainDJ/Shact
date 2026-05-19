using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DatabaseContext.Migrations
{
    /// <inheritdoc />
    public partial class AuthMigrate8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_Teams_TeamId1",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Requests_TeamId1",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "TeamId1",
                table: "Requests");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TeamId1",
                table: "Requests",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Requests_TeamId1",
                table: "Requests",
                column: "TeamId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Teams_TeamId1",
                table: "Requests",
                column: "TeamId1",
                principalTable: "Teams",
                principalColumn: "Id");
        }
    }
}
