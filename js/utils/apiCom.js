export async function apiCom(data, action){
    const options = {};

    switch(action){
        case "user:login": {
            options.method = "POST";
            options.body = {
                name: data.name,
                password: data.password
            }

            console.log(options.body)
            
            const resource = await fetcher("../../php/api/login.php", options);
            return resource;
        }

        case "user:register": {
            options.method = "POST";
            options.body = {
                name: data.name,
                password: data.password
            }
            
            const resource = await fetcher("../../php/api/user.php", options);
            return resource;
        }

        case "game:get-trolls": {
            options.method = "GET";
            const resource = await fetcher(`../../php/api/trolls.php?` + data, options);
            return resource;
        }

        case "game:get-food": {
            options.method = "GET";
            const resource = await fetcher(`../../php/api/food_items.php?` + data, options);
            return resource;
        }

        default: {
            console.warn("Unknown action: " + action);
            return null;
        }
    }
}

async function fetcher(url, options){
    try{
        const fetchOptions = {
            method: options.method,
            headers: {"content-type": "application/json"},
        };

        if(fetchOptions.method !== "GET" && options.body){
            fetchOptions.body = JSON.stringify(options.body);
        }

        const response = await fetch(url, fetchOptions);

        if(!response.ok){
            const errorMessage = await response.text();

            throw new Error(`Error: ${errorMessage}`);
        };

        return await response.json();
    }
    catch(error){
        console.error(error);
    }
}