using DataFlow.Dto;
using DataFlow.Entities;
using DataFlow.Models;

namespace Services;

public class RequestService
{
    private readonly Repositories.Repositories _repositories;
    
    public RequestService(Repositories.Repositories repositories)
    {
        _repositories = repositories;
    }
    
    public RequestDto Create(RequestEntity requestEntity)
    {
        Request um = (Request) requestEntity.ToModel();
        
        return (RequestDto) _repositories.RequestsRepository.Add(um).ToDto();
    }
    
    public List<RequestDto> GetByUserId(RequestEntity requestEntity)
    {
        Request um = (Request) requestEntity.ToModel();
        List<RequestEntity> requestEntities = _repositories.RequestsRepository.GetRecords(um);
        List<RequestDto> requestDtos = new List<RequestDto>();
        foreach (var elem in requestEntities)
        {
            RequestDto ue = (RequestDto) elem.ToDto();
            requestDtos.Add(ue);
        }
        return requestDtos;
    }
    
    public RequestDto Update(RequestEntity сEntity)
    {
        Request um = (Request) сEntity.ToModel();
        return (RequestDto) _repositories.RequestsRepository.Update(um).ToDto();
    }
    
    public List<KeyValuePair<int, int>> GetStatsAmount(int uid)
    {
        List<RequestEntity> requests = _repositories.RequestsRepository.GetAll();
        int result = 0;
        int accepted = 0;

        List<KeyValuePair<int, int>> matrix = new List<KeyValuePair<int, int>>();
        foreach (var request in requests)
        {
            if (request.UserId == uid)
            {
                result++;
                if (request.Status == "Одобрено")
                {
                    accepted++;
                }

                var s = new KeyValuePair<int, int>(result, accepted);
                matrix.Add(s);
            }
        }

        return matrix;
    }
}