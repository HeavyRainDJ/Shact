using System.Data;
using DatabaseContext;
using DataFlow.Entities;
using DataFlow.Models;
using Microsoft.EntityFrameworkCore;

namespace Repositories;

public class RequestsRepository
{
    private readonly Database _ctx;
    
    public RequestsRepository(Database ctx)
    {
        _ctx = ctx;
    }
    
    public RequestEntity Add(Request request)
    {
        if (request.UserId == null ||
            request.TeamId == null ||
            request.RequestText == null)
            throw new NoNullAllowedException($"user model has a null field");

        request.Status = "На рассмотрении";
        _ctx.Requests.Add(request);
        _ctx.SaveChanges();
        
        return (RequestEntity) request.ToEntity();
    }
    
    public List<RequestEntity> GetRecords(Request request)
    {
        if (request.UserId == null)
            throw new NoNullAllowedException($"request model has a null field");
        
        List<Request> requests = _ctx.Requests.Where(u => u.UserId == request.UserId).Include(u => u.Candidate).Include(u => u.Team).ToList();
        List<RequestEntity> requestEntities = new List<RequestEntity>();
        foreach (var elem in requests)
        {
            RequestEntity ue = (RequestEntity) elem.ToEntity();
            requestEntities.Add(ue);
        }
        return requestEntities;
    }
    
    public Request GetRecord(Request request)
    {
        if (request.Id == null)
            throw new NoNullAllowedException($"request model has a null field");
        
        List<Request> requests = _ctx.Requests.Where(u => u.Id == request.Id).Include(u => u.Candidate).Include(u => u.Team).ToList();

        return requests.First();
    }
    
    public List<RequestEntity> GetAll()
    {
        var lst = _ctx.Requests.ToList();
        List<RequestEntity> requestEntities = new List<RequestEntity>();
        foreach (var elem in lst)
        {
            RequestEntity ue = (RequestEntity) elem.ToEntity();
            requestEntities.Add(ue);
        }
        return requestEntities;
    }
    
    public RequestEntity Update(Request request)
    {
        if (request.Id == null)
            throw new NoNullAllowedException($"chakaton model has a null field");

        Request requestdb = GetRecord(request);

        if (request.Status != null) requestdb.Status = request.Status;
        
        _ctx.SaveChanges();
        
        return (RequestEntity) request.ToEntity();
    }
}