using DataFlow.Dto;
using Newtonsoft.Json;

namespace SHACT.Response;

public static class ResponseManager
{
    public static string SendError(string message)
    {
        var json = Newtonsoft.Json.JsonConvert.SerializeObject(new {Message = message});
        return json;
    }
    
    public static string SendJson(Object dto)
    {
        JsonSerializerSettings settings = new JsonSerializerSettings(); 
        settings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
        var json = Newtonsoft.Json.JsonConvert.SerializeObject(dto, settings);
        return json;
    }
}