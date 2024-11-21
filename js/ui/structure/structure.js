import { PubSub } from "../../utils/pubsub.js";
import { App } from "../../../index.js";

function renderStructure(parentSelector){
    const parent = document.querySelector(parentSelector);
    const data = App.gameData;
    const prepProcesses = getEveryPrepProcess(data.edibles);

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
            "data": prepProcesses,
            "renderStationEvent": "renderPrepStations"
        }
    });

    PubSub.publish({
        event: "renderInventory",
        details: {
            "parentId": "#inventory",
            "elementId": "edibles_container",
            "data": data.edibles,
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

function getEveryPrepProcess(edibles){
    const prepProcesses = [];

    for(let edible of edibles){
        const currentPrepProcess = edible.processes[0].preparation;
        if(!prepProcesses.includes(currentPrepProcess)){
            prepProcesses.push(currentPrepProcess);
        }    
    }

    return prepProcesses;
}