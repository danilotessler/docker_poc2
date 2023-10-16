using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.AspNetCore.Http.HttpResults;
namespace webapp2api.Controllers;

[ApiController]
[Route("[controller]")]
public class ApiController : ControllerBase
{
    private readonly ILogger<ApiController> _logger;
    private readonly IDistributedCache _cache;

    public ApiController(ILogger<ApiController> logger, IDistributedCache cache)
    {
        _logger = logger;
        _cache = cache;
    }

    [HttpGet]
    [Route("datetime")]
    public async Task<ActionResult<string>> GetDateTime()
    {
        return DateTime.Now.ToString("yyyyMMdd HH:mm:ss.fffff");
    }

    [HttpGet]
    [Route("ip")]
    public async Task<ActionResult<string>> GetIP()
    {
        return Dns.GetHostByName(Dns.GetHostName()).AddressList[0].ToString();
    }    

    [HttpGet]
    [Route("token/{key}")]
    public async Task<ActionResult<string>> GetValue(string key)
    {
        string? ret = _cache.GetString(key);

        if (ret == null)
            return NotFound();

        return ret;
    }    

    [HttpPost]
    [Route("token")]
    public async Task<ActionResult> SetValue(KeyPair kp)
    {
        _cache.SetString(kp.key, kp.value);

        return Ok();
    }

    [HttpPut]
    [Route("token/{key}")]
    public async Task<ActionResult> UpdateValue(string key, [FromBody]string value)
    {
        string? ret = _cache.GetString(key);

        if (ret == null)
            return NotFound();

        _cache.SetString(key, value);

        return Ok();
    }    
}

public class KeyPair
{
    public string key { get; set; }
    public string value { get; set; }
}