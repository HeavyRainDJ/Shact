using System.Data;
using DatabaseContext;
using DataFlow.Entities;
using DataFlow.Models;
using Microsoft.EntityFrameworkCore;

namespace Repositories;

public class TeamRepository
{
    private readonly Database _ctx;
    
    public TeamRepository(Database ctx)
    {
        _ctx = ctx;
    }
    
    private Team GetRecord(Team team)
    {
        if (team.Id == null)
            throw new NoNullAllowedException("Unexpected Nullable");
        
        List<Team> teams = _ctx.Teams.Where(u => u.Id == team.Id)
            .Include(u => u.Chakaton)
            .Include(u => u.Members)
            .Include(u => u.Requests)
            .Include(u => u.Leader).ToList();
        if (teams.Count == 0)
            throw new KeyNotFoundException($"Record 'User' with PK_id:{team.Id} not found");
        
        return teams.First();
    }
    
    public TeamEntity GetId(Team team)
    {
        return (TeamEntity) GetRecord(team).ToEntity();
    }
    
    public List<TeamEntity> GetAll()
    {
        var lst = _ctx.Teams
            .Include(u => u.Chakaton)
            .Include(u => u.Members)
            .Include(u => u.Requests)!
            .ThenInclude(u => u.Candidate)
            .Include(u => u.Leader).ToList();
        List<TeamEntity> teamEntities = new List<TeamEntity>();
        foreach (var elem in lst)
        {
            TeamEntity ue = (TeamEntity) elem.ToEntity();
            teamEntities.Add(ue);
        }
        return teamEntities;
    }
    
    public TeamEntity Add(Team team)
    {
        if (team.Name == null ||
            team.Direction == null ||
            team.Requirements == null)
            throw new NoNullAllowedException($"user model has a null field");

        team.Members = new List<User>();

        var user = new User(){Id = team.LeaderId};
        _ctx.Users.Attach(user);
        team.Members.Add(_ctx.Users.Local.Single(x => x.Id == team.LeaderId));
        _ctx.Teams.Add(team);
        _ctx.SaveChanges();
        
        return (TeamEntity) team.ToEntity();
    }
}