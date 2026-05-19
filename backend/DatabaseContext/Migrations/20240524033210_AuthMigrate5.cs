using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DatabaseContext.Migrations
{
    /// <inheritdoc />
    public partial class AuthMigrate5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RequestTeam");

            migrationBuilder.AlterColumn<string>(
                name: "RequestText",
                table: "Requests",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<string>(
                name: "RequestText",
                table: "Requests",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "RequestTeam",
                columns: table => new
                {
                    RequestsId = table.Column<int>(type: "integer", nullable: false),
                    TeamsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequestTeam", x => new { x.RequestsId, x.TeamsId });
                    table.ForeignKey(
                        name: "FK_RequestTeam_Requests_RequestsId",
                        column: x => x.RequestsId,
                        principalTable: "Requests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RequestTeam_Teams_TeamsId",
                        column: x => x.TeamsId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RequestTeam_TeamsId",
                table: "RequestTeam",
                column: "TeamsId");
        }
    }
}
