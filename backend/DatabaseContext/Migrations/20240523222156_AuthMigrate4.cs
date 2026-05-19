using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DatabaseContext.Migrations
{
    /// <inheritdoc />
    public partial class AuthMigrate4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChakatonTeam");

            migrationBuilder.AlterColumn<string>(
                name: "Requirements",
                table: "Teams",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "Teams",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Direction",
                table: "Teams",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<int>(
                name: "ChakatonId",
                table: "Teams",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Teams_ChakatonId",
                table: "Teams",
                column: "ChakatonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_Chakatons_ChakatonId",
                table: "Teams",
                column: "ChakatonId",
                principalTable: "Chakatons",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teams_Chakatons_ChakatonId",
                table: "Teams");

            migrationBuilder.DropIndex(
                name: "IX_Teams_ChakatonId",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "ChakatonId",
                table: "Teams");

            migrationBuilder.AlterColumn<string>(
                name: "Requirements",
                table: "Teams",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "Teams",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Direction",
                table: "Teams",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "ChakatonTeam",
                columns: table => new
                {
                    ChakatonsId = table.Column<int>(type: "integer", nullable: false),
                    TeamsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChakatonTeam", x => new { x.ChakatonsId, x.TeamsId });
                    table.ForeignKey(
                        name: "FK_ChakatonTeam_Chakatons_ChakatonsId",
                        column: x => x.ChakatonsId,
                        principalTable: "Chakatons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChakatonTeam_Teams_TeamsId",
                        column: x => x.TeamsId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChakatonTeam_TeamsId",
                table: "ChakatonTeam",
                column: "TeamsId");
        }
    }
}
