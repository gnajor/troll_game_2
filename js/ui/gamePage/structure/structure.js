import { PubSub } from "../../../utils/pubsub.js";

function renderStructure(parentSelector, data){
    const parent = document.querySelector(parentSelector);
    console.log(data.foodItems)
    const prepMethod = data.foodItems.map(foodItem => foodItem.prep_method);

    if(!parent){
        console.error("Parent Element Error");
        return;
    }

    parent.innerHTML = 
    `<div id="wrapper">
        <div id="timer"></div>
        <div id="bin"></div>
        <div id="dining_room"></div>
        <div id="bar"></div>
        <div id="kitchen"></div>
        <div id="inventory"></div>
    </div>`;

    PubSub.publish({
        event: "renderTimer",
        details: "#timer"
    });

    PubSub.publish({
        event: "renderBin",
        details: "#bin"
    });

    PubSub.publish({
        event: "renderDiningRoom",
        details: {
            "parentId": "#dining_room",
            "elementId": "trolls_container",
            "data": data.trolls,
            "renderStationEvent": "renderTrolls"
        }
    });

    PubSub.publish({
        event: "renderBar",
        details: {
            "parentId": "#bar",
            "elementId": "bar_stations_container",
            "data": [],
            "renderStationEvent": "renderBarStations"
        }
    });

    PubSub.publish({
        event: "renderKitchen",
        details: {
            "parentId": "#kitchen",
            "elementId": "prep_stations_container",
            "data": prepMethod,
            "renderStationEvent": "renderPrepStations"
        }
    });

    PubSub.publish({
        event: "renderInventory",
        details: {
            "parentId": "#inventory",
            "elementId": "edibles_container",
            "data": data.foodItems,
            "renderStationEvent": "renderEdibles"
        }
    });
}

PubSub.subscribe({
    event: "renderStructure",
    listener: (details) => {
        renderStructure(details.parent, details.data);
    }
})
