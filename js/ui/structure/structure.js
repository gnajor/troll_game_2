import { PubSub } from "../../utils/pubsub.js";

function renderStructure(parentSelector){
    const parent = document.querySelector(parentSelector);
    if(!parent){
        console.error("Parent Element Error");
        return;
    }

    parent.innerHTML = 
    `<div id="wrapper">
        <div id="timer"></div>
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
        event: "renderDiningRoom",
        details: {
            "parentId": "#dining_room",
            "elementId": "trolls_container",
            "data": [],
            "renderStationEvent": "renderTrolls"
        }
    });

    PubSub.publish({
        event: "renderBar",
        details: {
            "parentId": "#bar",
            "elementId": "bar_container",
            "data": [],
            "renderStationEvent": "renderBarStations"
        }
    });

    PubSub.publish({
        event: "renderKitchen",
        details: {
            "parentId": "#kitchen",
            "elementId": "prep_stations_container",
            "data": [],
            "renderStationEvent": "renderPrepStations"
        }
    });

    PubSub.publish({
        event: "renderInventory",
        details: {
            "parentId": "#inventory",
            "elementId": "edibles_container",
            "data": [],
            "renderStationEvent": "renderEdibles"
        }
    });
}

PubSub.subscribe({
    event: "renderStructure",
    listener: (parentSelector) => {
        renderStructure(parentSelector);
    }
})