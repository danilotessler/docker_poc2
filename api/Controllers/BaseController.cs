using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using System.Reflection.Metadata;

namespace webapp2api.Controllers;

[ApiController]
[Route("[controller]")]
public class BaseController : ControllerBase
{
    private readonly ILogger<BaseController> _logger;
    private readonly IDistributedCache _cache;

    public BaseController(ILogger<BaseController> logger, IDistributedCache cache)
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

    [HttpPost]
    [Route("getvalue")]
    public async Task<ActionResult<string>> GetValue(KeyPair kp)
    {
        string? ret = _cache.GetString(kp.key);

        if (ret == null)
            ret = "";

        return ret;
    }    

    [HttpPost]
    [Route("setvalue")]
    public async Task<ActionResult<string>> SetValue(KeyPair kp)
    {
        _cache.SetString(kp.key, kp.value);

        return "";
    }       
}

public class KeyPair
{
    public string key { get; set; }
    public string value { get; set; }
}