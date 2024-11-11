import { PubSub } from "./js/utils/pubsub.js";
import * as structure from "./js/ui/structure/structure.js";
import * as stationsContainer from "./js/ui/stationsContainer/stationsContainer.js";


PubSub.publish({
    event: "renderStructure",
    details: "body"
});



async function postToDatabase(){
    
}




async function fetcher(request){
    try {
        const response = await fetch(request);
        const responseData = {
            ok: response.ok,
            status: response.status,
            data: await response.json()
        };

        return responseData
    } 
    catch {
        console.error("Fetch error");
    }
}