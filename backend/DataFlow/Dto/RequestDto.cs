using System.Text.Json.Serialization;
using DataFlow.Entities;
using DataFlow.Models;

namespace DataFlow.Dto;

public class RequestDto : IDto
{
    [JsonIgnore]
    public int? Id { get; set; }

    [JsonIgnore]
    public int? UserId { get; set; }

    public int? TeamId { get; set; }

    public List<string>? RequestText {get; set; }
    
    [JsonIgnore]
    public User? Candidate {get; set; }
    [JsonIgnore]
    public Team? Team {get; set; }
    [JsonIgnore]
    public string? Status {get; set; }


    public IEntity ToEntity()
    {
        RequestEntity user = new RequestEntity();
        user.Id = Id;
        user.UserId = UserId;
        user.TeamId = TeamId;
        if (RequestText != null) user.RequestText = string.Join(",", RequestText);
        user.Candidate = Candidate;
        user.Team = Team;
        user.Status = Status;
        return user;
    }
}