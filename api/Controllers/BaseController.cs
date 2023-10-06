using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;

namespace webapp2api.Controllers;

[ApiController]
[Route("[controller]")]
public class BaseController : ControllerBase
{
    private readonly ILogger<BaseController> _logger;

    public BaseController(ILogger<BaseController> logger)
    {
        _logger = logger;
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
    public async Task<ActionResult<string>> GetValue()
    {
        return "";
    }    

    [HttpPost]
    [Route("setvalue")]
    public async Task<ActionResult<string>> SetValue()
    {
        return "";
    }       
}
