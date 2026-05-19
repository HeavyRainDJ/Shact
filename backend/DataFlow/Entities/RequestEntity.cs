using DataFlow.Dto;
using DataFlow.Models;

namespace DataFlow.Entities;

public class RequestEntity : IEntity
{
    public int? Id { get; set; }
    public int? UserId { get; set; }
    public int? TeamId { get; set; }
    public string? RequestText {get; set; }
    public User? Candidate {get; set; }
    public Team? Team {get; set; }
    public string? Status {get; set; }
    
    public IModel ToModel()
    {
        Request user = new Request();
        user.Id = Id;
        user.UserId = UserId;
        user.TeamId = TeamId;
        user.RequestText = RequestText;
        user.Candidate = Candidate;
        user.Team = Team;
        user.Status = Status;
        return user;
    }

    public IDto ToDto()
    {
        RequestDto user = new RequestDto();
        user.Id = Id;
        user.UserId = UserId;
        user.TeamId = TeamId;
        user.RequestText = RequestText?.Split(",").ToList();
        user.Candidate = Candidate;
        user.Team = Team;
        user.Status = Status;
        return user;
    }
}