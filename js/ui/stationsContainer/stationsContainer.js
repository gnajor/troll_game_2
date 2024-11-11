import { PubSub } from "../../utils/pubsub.js";

function renderStationsContainer(details){
    const {parentId, elementId, data, renderStationEvent} = details;

    const parent = document.querySelector(parentId);

    if(!parent){
        console.error("Parent Element error");
        return;
    }

    const stationsContainer = document.createElement("div");
    parent.appendChild(stationsContainer);
    stationsContainer.id = elementId;

    const stationsToRender = data.length > 0 ? data.length : 6;

    for(let i = 0; i < stationsToRender ; i++){
        PubSub.publish({
            event: renderStationEvent,
            details: {
                "data": data[i], 
                "parentId": "#" + stationsContainer.id, 
                "id": i + 1,
            }
        });
    }
}

PubSub.subscribe({
    event: "renderDiningRoom",
    listener: (details) => {
        renderStationsContainer(details);
    }
});

PubSub.subscribe({
    event: "renderBar",
    listener: (details) => {
        renderStationsContainer(details);
    }
});

PubSub.subscribe({
    event: "renderKitchen",
    listener: (details) => {
        renderStationsContainer(details);
    }
});

PubSub.subscribe({
    event: "renderInventory",
    listener: (details) => {
        renderStationsContainer(details);
    }
});