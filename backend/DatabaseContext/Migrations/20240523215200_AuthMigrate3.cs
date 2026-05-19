using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DatabaseContext.Migrations
{
    /// <inheritdoc />
    public partial class AuthMigrate3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Chakatons",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Chakatons");
        }
    }
}
