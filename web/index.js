var intervalId = null;

async function Get(divID, apiPath) 
{
    var uri = APIURI() + apiPath;

    console.log(uri);

    const options = {
        method: "GET"
    };

    fetch (uri, options)
    .then(async response => 
    { 
        console.log(uri + " - " + response.status);
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
        console.log(error); // Example: Logging the error to the console 
    });
}

async function Post(divID, apiPath, payload) 
{
    var uri = APIURI() + apiPath;

    const options = {
        method: "POST",
        headers: new Headers({'content-type': 'application/json'})
    };

    options.body = JSON.stringify(payload);

    fetch (uri, options)
    .then(async response => 
    { 
        console.log(uri + " - " + response.status);
        console.log(options.body);

        setValue(divID, response.status);
    })
    .catch(error => { 
        setValue(divID, "ERROR");
        console.log(error);
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
    Get("ip", "/api/ip");
    Get("datetime", "/api/datetime");

    var token = getValueTextBox("tokenIDRead");
    if (token.length > 0)
        Get("token", "/api/token/" + token);
    else
        setValue("token", "");
}

function SetToken()
{
    Post("response", "/api/token", { key : document.getElementById("tokenKey").value , value : document.getElementById("tokenValue").value })
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
    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.has('apigw'))
        return "https://xjoclxq9pi.execute-api.us-east-2.amazonaws.com";
    else
        return "http://spapoc-api-1646957827.us-east-2.elb.amazonaws.com";
}