function PostValue(value) 
{

    fetch ("/echo/json/",
    {
        method: "POST",
        body: value
    })
    .then(response => 
    { 
        if (response.ok)
        { 
        return response.json(); // Parse the response data as JSON 
        } 
        else
        { 
            throw new Error('API request failed'); 
        } 
    }) 
    .catch(error => { 
        // Handle any errors here 
        console.error(error); // Example: Logging the error to the console 
    });


}
