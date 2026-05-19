using DataFlow.Entities;

namespace DataFlow.Models;

public class Request : IModel
{
    public int? Id { get; set; }
    public int? UserId { get; set; }
    public int? TeamId { get; set; }
    public string? RequestText {get; set; }
    public User? Candidate {get; set; }
    public Team? Team {get; set; }
    public string? Status {get; set; }

    public Request(int userId, int teamId, string requestText, User user, Team team, string status)
    {
        UserId = userId;
        TeamId = teamId;
        RequestText = requestText;
        Candidate = user;
        Team = team;
        Status = status;
    }
    
    public Request(){}
    
    public IEntity ToEntity()
    {
        RequestEntity user = new RequestEntity();
        user.Id = Id;
        user.UserId = UserId;
        user.TeamId = TeamId;
        user.RequestText = RequestText;
        user.Candidate = Candidate;
        user.Team = Team;
        user.Status = Status;
        return user;
    }
}