using DataFlow.Dto;
using DataFlow.Entities;
using DataFlow.Models;

namespace Services;

public class ChakatonService
{
    private readonly Repositories.Repositories _repositories;
    
    public ChakatonService(Repositories.Repositories repositories)
    {
        _repositories = repositories;
    }
    
    public ChakatonDto Read(ChakatonEntity chakaton)
    {
        Chakaton um = (Chakaton) chakaton.ToModel();
        return (ChakatonDto) _repositories.ChakatonRepository.GetId(um).ToDto();
    }
    
    public List<ChakatonDto> ReadAll(ChakatonEntity chakaton)
    {
        Chakaton um = (Chakaton) chakaton.ToModel();
        var lst = _repositories.ChakatonRepository.GetAll();
        var newlst = new List<ChakatonDto>();
        foreach (var elem in lst)
        {
            ChakatonDto ue = (ChakatonDto) elem.ToDto();
            newlst.Add(ue);
        }
        return newlst;
    }
    
    public ChakatonDto Create(ChakatonEntity сEntity)
    {
        Chakaton um = (Chakaton) сEntity.ToModel();
        return (ChakatonDto) _repositories.ChakatonRepository.Add(um).ToDto();
    }
    
    public ChakatonDto Update(ChakatonEntity сEntity)
    {
        Chakaton um = (Chakaton) сEntity.ToModel();
        return (ChakatonDto) _repositories.ChakatonRepository.Update(um).ToDto();
    }
    
    public ChakatonDto Remove(ChakatonEntity сEntity)
    {
        Chakaton um = (Chakaton) сEntity.ToModel();
        return (ChakatonDto) _repositories.ChakatonRepository.Remove(um).ToDto();
    }

    public List<ChakatonStatAmount> GetStatsAmount()
    {
        List<ChakatonEntity> chakatonEntities = _repositories.ChakatonRepository.GetAll();
        List<ChakatonStatAmount> chakatonStatAmounts = new List<ChakatonStatAmount>();

        HashSet<String> directions = new HashSet<String>();
        List<String> directionsAmount = new List<String>();

        foreach (var ch in chakatonEntities)
        {
            var arr = ch.Direction.Split(",");
            foreach (var c in arr)
            {
                directions.Add(c);
                directionsAmount.Add(c);
            }
        }

        foreach (var item in directions)
        {
            var a = new ChakatonStatAmount();
            a.Name = item;
            a.Amount = 0;
            
            chakatonStatAmounts.Add(a);
        }
        
        foreach (var item in directionsAmount)
        {
            var a = chakatonStatAmounts.Where(a => a.Name == item);
            a.First().Amount += 1;
        }

        return chakatonStatAmounts;
    }
}