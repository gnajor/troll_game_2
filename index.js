import { PubSub } from "./js/utils/pubsub.js";
import * as structure from "./js/ui/structure/structure.js";
import * as stationsContainer from "./js/ui/stationsContainer/stationsContainer.js";


PubSub.publish({
    event: "renderStructure",
    details: "body"
});