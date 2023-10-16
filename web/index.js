var intervalId = null;

async function Get(divID, apiPath) 
{
    var uri = APIURI() + apiPath;

    console.log(uri);

    fetch (uri,
    {
        method: "GET"
    })
    .then(async response => 
    { 
        console.log(response.ok);
        if (response.ok)
        { 
            var value = await response.text();

            setValue(divID, value);
        } 
        else
        { 
            setValue(divID, "Not Found");
        } 
    })
    .catch(error => { 
        console.error(error); // Example: Logging the error to the console 
    });
}

async function Post(divID, apiPath, payload) 
{
    var uri = APIURI() + apiPath;

    fetch (uri,
    {
        method: "POST",
        body: payload
    })
    .then(async response => 
    { 
        setValue(divID, response.status);
    })
    .catch(error => { 
        setValue(divID, "ERROR");
        console.error(error);
    });
}

function Refresh()
{
    if (intervalId == null)
    {
        LoadAll();
        intervalId = setInterval(LoadAll, 5000);
    }
    else
    {
        clearInterval(intervalId);
        intervalId = null;
    }
}

function LoadAll()
{
    Get("datetime", "/api/datetime");
    Get("ip", "/api/ip");

    var token = getValueTextBox("tokenIDRead");
    if (token.length > 0)
        Get("token", "/api/ip/" + token);
    else
    setValue("token", "");
}

function SetToken()
{
    Post("response", "/api/token", "{ key : " + document.getElementById("tokenKey").value + ", value : " + document.getElementById("tokenValue").value + " }")
}

function setValue(id, value) 
{
    document.getElementById(id).innerHTML = value;
}

function getValueTextBox(id) 
{
    return document.getElementById(id).value;
}

function getValueDiv(id) 
{
    return document.getElementById(id).innerHTML;
}

function APIURI()
{
    return "http://localhost"
}