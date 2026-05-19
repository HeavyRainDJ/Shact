using DataFlow.Entities;

namespace DataFlow.Models;

public class Team : IModel
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
    //public User User { get; set; } = null!;

    public Team(string name, string image, string direction, string requirements, int leaderId, User user, Chakaton chakaton, int chakatonId)
    {
        Name = name;
        Image = image;
        Direction = direction;
        Requirements = requirements;
        LeaderId = leaderId;
        Leader = user;
        ChakatonId = chakatonId;
        Chakaton = chakaton;
    }
    
    public Team(){}
    
    public IEntity ToEntity()
    {
        TeamEntity team = new TeamEntity();
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
}