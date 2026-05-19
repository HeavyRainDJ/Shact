using DataFlow.Dto;
using DataFlow.Entities;
using DataFlow.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SHACT.Response;

namespace SHACT.Controllers;

[ApiController]
[Route("api/[controller]")]
public class Teams : ControllerBase
{
    private readonly Services.Services _services;
    
    public Teams(Services.Services services)
    {
        _services = services;
    }
    
    // ЗPOST: api/teams
    /// <summary>
    /// Создание команды.
    /// </summary>
    /// <remarks>
    /// Возвращает созданную команду.
    /// </remarks>
    /// <returns>Возвращает запись создаваемой команды.</returns>
    /// <response code="200">Данные успешно получены.</response>
    /// <response code="500">Внутренняя ошибка, подключение к Базе Данных.</response>
    [HttpPost]
    [Authorize]
    public IActionResult Create([FromBody] TeamDto teamDto)
    {
        try
        {
            var jwtUid = User.Identity?.Name;
            teamDto.LeaderId = Convert.ToInt32(jwtUid);
            
            TeamDto r = _services.TeamsService.Create((TeamEntity)teamDto.ToEntity());
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
    
    // GET: api/teams
    /// <summary>
    /// Получение команды.
    /// </summary>
    /// <remarks>
    /// Возвращает полученные данные команды.
    /// </remarks>
    /// <param name="сid">Уникальный ID номер получаемой команды.</param>
    /// <returns>Возвращает запись получаемой команды.</returns>
    /// <response code="200">Данные успешно получены.</response>
    /// <response code="404">Команда с таким ID номером не найден.</response>
    /// <response code="500">Внутренняя ошибка, подключение к Базе Данных.</response>
    [HttpGet]
    public IActionResult Get([FromQuery] int сid)
    {
        try
        {
            TeamDto teamDto = new TeamDto();
            teamDto.Id = сid;

            TeamEntity ue = (TeamEntity)teamDto.ToEntity();
            TeamDto result = _services.TeamsService.Read(ue);

            result.Chakaton.Teams = null;
            result.Leader.Teams = null;
            result.Leader.Requests = null;
            foreach (var elem2 in result.Members)
            {
                elem2.Teams = null;
                elem2.Requests = null;
            }
            foreach (var elem2 in result.Requests)
            {
                elem2.Team = null;
            }

            return Ok(ResponseManager.SendJson(result));
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
    public String Update()
    {
        return "Update Fine!";
    }
    
    [HttpDelete]
    public String Delete()
    {
        return "Delete Fine!";
    }
    
    // GET: api/teams/all
    /// <summary>
    /// Получение всех команд.
    /// </summary>
    /// <remarks>
    /// Возвращает полученные данные всех команд.
    /// </remarks>
    /// <returns>Возвращает все записи команд.</returns>
    /// <response code="200">Данные успешно получены.</response>
    /// <response code="500">Внутренняя ошибка, подключение к Базе Данных.</response>
    [HttpGet]
    [Route("All")]
    public IActionResult GetAll()
    {
        try
        {
            TeamDto chakatonDto = new TeamDto();
            TeamEntity ue = (TeamEntity) chakatonDto.ToEntity();
            List<TeamDto> result = _services.TeamsService.ReadAll(ue);

            foreach (var elem in result)
            {
                elem.Chakaton.Teams = null;
                elem.Leader.Teams = null;
                elem.Leader.Requests = null;
                foreach (var elem2 in elem.Members)
                {
                    elem2.Teams = null;
                    elem2.Requests = null;
                }
                foreach (var elem2 in elem.Requests)
                {
                    elem2.Team = null;
                }
            }
            
            return Ok(ResponseManager.SendJson(result));
        }
        catch (Exception e)
        {
            return StatusCode(500, ResponseManager.SendError(e.Message));
        }
    }
    
    [HttpGet]
    [Route("jwt")]
    [Authorize]
    public IActionResult GetAllUser()
    {
        try
        {
            var jwtUid = User.Identity?.Name;
            int uid = Convert.ToInt32(jwtUid);


            TeamEntity ue = new TeamEntity();
            List<TeamDto> result = _services.TeamsService.ReadAll(ue);

            List<TeamDto> res = new List<TeamDto>();
            foreach (var elem in result)
            {
                if (elem.Leader.Id == uid)
                {
                    res.Add(elem);
                }
            }
            
            foreach (var elem in res)
            {
                elem.Chakaton.Teams = null;
                elem.Leader.Teams = null;
                elem.Leader.Requests = null;
                foreach (var elem2 in elem.Members)
                {
                    elem2.Teams = null;
                    elem2.Requests = null;
                }
                foreach (var elem2 in elem.Requests)
                {
                    elem2.Team = null;
                }
            }
            
            return Ok(ResponseManager.SendJson(res));
        }
        catch (Exception e)
        {
            return StatusCode(500, ResponseManager.SendError(e.Message));
        }
    }
    
    // GET: api/teams/AmountStats
    /// <summary>
    /// Получение статистики по количеству участий.
    /// </summary>
    /// <remarks>
    /// Возвращает полученные данные всех участий.
    /// </remarks>
    /// <returns>Возвращает количество записей участий.</returns>
    /// <response code="200">Данные успешно получены.</response>
    /// <response code="500">Внутренняя ошибка, подключение к Базе Данных.</response>
    [HttpGet]
    [Route("AmountStats")]
    [Authorize]
    public IActionResult GetStats()
    {
        try
        {
            int uid = Convert.ToInt32(User.Identity?.Name);
            int result = _services.TeamsService.GetStatsAmount(uid);
            return Ok(ResponseManager.SendJson(new {amount = result}));
        }
        catch (Exception e)
        {
            return StatusCode(500, ResponseManager.SendError(e.Message));
        }
    }
}