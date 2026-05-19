using DataFlow.Dto;
using DataFlow.Models;

namespace DataFlow.Entities;

public class TeamEntity : IEntity
{
    public int? Id { get; set; }
    public string? Name { get; set; }
    public string? Image { get; set; }
    public string? Direction { get; set; }
    public string? Requirements { get; set; }
    public List<User>? Members { get; set; }
    public int? ChakatonId { get; set; }
    public Chakaton? Chakaton { get; set; }
    public List<Request>? Requests { get; set; }
    public int? LeaderId { get; set; }
    public User? Leader { get; set; }
    
    public IModel ToModel()
    {
        Team team = new Team();
        team.Id = Id;
        team.Name = Name;
        team.Image = Image;
        team.Direction = Direction;
        team.Requirements = Requirements;
        team.Members = Members;
        team.ChakatonId = ChakatonId;
        team.Chakaton = Chakaton;
        team.Requests = Requests;
        team.LeaderId = LeaderId;
        team.Leader = Leader;
        return team;
    }

    public IDto ToDto()
    {
        TeamDto team = new TeamDto();
        team.Id = Id;
        team.Name = Name;
        team.Image = Image;
        team.Direction = Direction?.Split(",").ToList();;
        team.Requirements = Requirements;
        team.Members = Members;
        team.ChakatonId = ChakatonId;
        team.Chakaton = Chakaton;
        team.Requests = Requests;
        team.LeaderId = LeaderId;
        team.Leader = Leader;
        return team;
    }
}