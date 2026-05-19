using DataFlow.Entities;

namespace DataFlow.Models;

public class Chakaton : IModel
{
    public int? Id { get; set; }
    
    public string? Name { get; set; }
    
    public string? Dates { get; set; }
    
    public string? Type { get; set; }
    
    public string? Location { get; set; }
    
    public string? Direction { get; set; }
    
    public string? Info { get; set; }
    
    public string? Links { get; set; }
    
    public List<Team>? Teams { get; set; }

    public Chakaton(string name, string dates, string type, string direction, 
        string info, string links, string location)
    {
        Name = name;
        Dates = dates;
        Type = type;
        Direction = direction;
        Location = location;
        Info = info;
        Links = links;
    }

    public Chakaton(){}

    public IEntity ToEntity()
    {
        ChakatonEntity chakaton = new ChakatonEntity();
        chakaton.Id = Id;
        chakaton.Name = Name;
        chakaton.Dates = Dates;
        chakaton.Type = Type;
        chakaton.Direction = Direction;
        chakaton.Location = Location;
        chakaton.Info = Info;
        chakaton.Links = Links;
        chakaton.Teams = Teams;
        return chakaton;
    }
}