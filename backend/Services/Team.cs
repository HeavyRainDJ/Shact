using DataFlow.Dto;
using DataFlow.Entities;
using DataFlow.Models;

namespace Services;

public class TeamsService
{
    private readonly Repositories.Repositories _repositories;
    
    public TeamsService(Repositories.Repositories repositories)
    {
        _repositories = repositories;
    }
    
    public TeamDto Read(TeamEntity team)
    {
        Team um = (Team) team.ToModel();
        return (TeamDto) _repositories.TeamRepository.GetId(um).ToDto();
    }
    
    public List<TeamDto> ReadAll(TeamEntity team)
    {
        Team um = (Team) team.ToModel();
        var lst = _repositories.TeamRepository.GetAll();
        var newlst = new List<TeamDto>();
        foreach (var elem in lst)
        {
            TeamDto ue = (TeamDto) elem.ToDto();
            newlst.Add(ue);
        }
        return newlst;
    }

    public int GetStatsAmount(int uid)
    {
        List<TeamEntity> teams = _repositories.TeamRepository.GetAll();
        int result = 0;
        foreach (var team in teams)
        {
            foreach (var member in team.Members)
            {
                if (member.Id == uid)
                {
                    result++;
                    break;
                }
            }
        }

        return result;
    }
    
    public TeamDto Create(TeamEntity teamEntity)
    {
        Team um = (Team) teamEntity.ToModel();
        
        return (TeamDto) _repositories.TeamRepository.Add(um).ToDto();
    }

    // public UserDto Create(UserEntity user)
    // {
    //     User um = (User) user.ToModel();
    //     if (um.Password != null) um.Password = _repositories.UserRepository.CreateMd5(um.Password);
    //     return (UserDto) _repositories.UserRepository.Add(um).ToDto();
    // }
    //
    // public UserDto Update(UserEntity user)
    // {
    //     User um = (User) user.ToModel();
    //     return (UserDto) _repositories.UserRepository.Update(um).ToDto();
    // }
    //
    // public UserDto Remove(UserEntity user)
    // {
    //     User um = (User) user.ToModel();
    //     return (UserDto) _repositories.UserRepository.Remove(um).ToDto();
    // }
}