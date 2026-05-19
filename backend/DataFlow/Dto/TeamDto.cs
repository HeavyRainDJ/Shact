using System.Text.Json.Serialization;
using DataFlow.Entities;
using DataFlow.Models;

namespace DataFlow.Dto;

public class TeamDto : IDto
{
    [JsonIgnore]
    public int? Id { get; set; }
    public string? Name { get; set; }
    [JsonIgnore]
    public string? Image { get; set; }
    public List<string>? Direction { get; set; }
    public string? Requirements { get; set; }
    [JsonIgnore]
    public List<User>? Members { get; set; }
    public int? ChakatonId { get; set; }
    [JsonIgnore]
    public Chakaton? Chakaton { get; set; }
    [JsonIgnore]
    public List<Request>? Requests { get; set; }
    [JsonIgnore]
    public int? LeaderId { get; set; }
    [JsonIgnore]
    public User? Leader { get; set; }
    
    public IEntity ToEntity()
    {
        TeamEntity team = new TeamEntity();
        team.Id = Id;
        team.Name = Name;
        team.Image = Image;
        if (Direction != null) team.Direction = string.Join(",", Direction);
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