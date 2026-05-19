using DataFlow.Dto;
using DataFlow.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SHACT.Response;

namespace SHACT.Controllers;

[ApiController]
[Route("api/[controller]")]
public class Requests : ControllerBase
{
    private readonly Services.Services _services;
    
    public Requests(Services.Services services)
    {
        _services = services;
    }
    
    // POST: api/requests
    /// <summary>
    /// Создание нового запроса в команду.
    /// </summary>
    /// <remarks>
    /// Создает запись пользователя в команду.
    /// </remarks>
    /// <returns>Возвращает запись нового пользователя.</returns>
    /// <response code="200">Пользователь успешно добавлен.</response>
    /// <response code="400">Недостаточно полей заполнено для создания запроса.</response>
    /// <response code="401">Недостаточно прав у пользователя.</response>
    /// <response code="500">Внутренняя ошибка, подключение к Базе Данных.</response>
    [Authorize]
    [HttpPost]
    public IActionResult Create([FromBody] RequestDto requestDto)
    {
        try
        {
            var jwtUid = User.Identity?.Name;
            requestDto.UserId = Convert.ToInt32(jwtUid);

            RequestDto r = _services.RequestService.Create((RequestEntity)requestDto.ToEntity());
            return Ok(ResponseManager.SendJson(r));
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(ResponseManager.SendError(e.Message));
        }
        catch (Exception e)
        {
            return StatusCode(500, ResponseManager.SendError(e.Message));
        }
    }
    
    // GET: api/requests
    /// <summary>
    /// Получение запросов пользователя.
    /// </summary>
    /// <remarks>
    /// Возвращает полученные данные запросов пользователя.
    /// </remarks>
    /// <returns>Возвращает запись получаемого пользователя.</returns>
    /// <response code="200">Данные успешно получены.</response>
    /// <response code="404">Пользователь с таким ID номером не найден.</response>
    /// <response code="500">Внутренняя ошибка, подключение к Базе Данных.</response>
    [Authorize]
    [HttpGet]
    public IActionResult Get()
    {
        try
        {
            var jwtUid = User.Identity?.Name;

            RequestEntity requestEntity = new RequestEntity();
            requestEntity.UserId = Convert.ToInt32(jwtUid);
            
            return Ok(ResponseManager.SendJson(_services.RequestService.GetByUserId(requestEntity)));
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(ResponseManager.SendError(e.Message));
        }
        catch (Exception e)
        {
            return StatusCode(500, ResponseManager.SendError(e.Message));
        }
    }
    
    [HttpPatch]
    [Authorize]
    public IActionResult Update([FromBody] RequestInDto request)
    {
        try
        {
            var jwtUid = User.Identity?.Name;

            RequestEntity requestEntity = new RequestEntity();
            requestEntity.Id = request.Id;
            requestEntity.Status = request.Status;
            
            return Ok(ResponseManager.SendJson(_services.RequestService.Update(requestEntity)));
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(ResponseManager.SendError(e.Message));
        }
        catch (Exception e)
        {
            return StatusCode(500, ResponseManager.SendError(e.Message));
        }
    }
    
    [HttpDelete]
    public String Delete()
    {
        return "Delete Fine!";
    }
    
    // GET: api/requests/LinerStats
    /// <summary>
    /// Получение статистики по количеству запросов.
    /// </summary>
    /// <remarks>
    /// Возвращает полученные данные всех запрсоов.
    /// </remarks>
    /// <returns>Возвращает количество записей запросов.</returns>
    /// <response code="200">Данные успешно получены.</response>
    /// <response code="500">Внутренняя ошибка, подключение к Базе Данных.</response>
    [HttpGet]
    [Route("LinerStats")]
    [Authorize]
    public IActionResult GetLinerStats()
    {
        try
        {
            int uid = Convert.ToInt32(User.Identity?.Name);
            List<KeyValuePair<int, int>> result = _services.RequestService.GetStatsAmount(uid);
            return Ok(ResponseManager.SendJson(new {matrix = result}));
        }
        catch (Exception e)
        {
            return StatusCode(500, ResponseManager.SendError(e.Message));
        }
    }
}