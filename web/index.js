async function Get(divID, apiPath) 
{
    var uri = APIURI() + apiPath;

    fetch (uri,
    {
        method: "GET"
    })
    .then(async response => 
    { 
        if (response.ok)
        { 
            var value = await response.text();

            setValue(divID, value);
        } 
        else
        { 
            throw new Error('API request failed'); 
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
        if (response.ok)
        { 
            var value = await response.text();

            setValue(divID, value);
        } 
        else
        { 
            throw new Error('API request failed'); 
        } 
    })
    .catch(error => { 
        console.error(error); // Example: Logging the error to the console 
    });
}

function LoadAll()
{
    //Get("datetime", "/Base/datetime");
    Get("ip", "/Base/ip");
    //Post("token", "/Base/getvalue", "{ key : " + document.getElementById("tokenKey").value + "}") 
}

function SetToken()
{
    Post("token", "/Base/setvalue", "{ key : " + document.getElementById("tokenKey").value + ", value : " + document.getElementById("tokenValue").value + " }")
    LoadAll(); 
}

function setValue(id, value) 
{
    document.getElementById(id).innerHTML = value;
}

function APIURI()
{
    return document.getElementById("apiURI").value;
}