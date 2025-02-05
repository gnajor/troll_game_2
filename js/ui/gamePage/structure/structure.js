import { PubSub } from "../../../utils/pubsub.js";

export function renderStructure(parentSelector, data){
    const parent = document.querySelector(parentSelector);

    if(!parent){
        console.error("Parent Element Error");
        return;
    }

    const prepMethodRepeat = data.foodItems.map(foodItem => foodItem.prep_method);
    const prepMethods = prepMethodRepeat.filter((prepMethod, index) => {
            return prepMethodRepeat.indexOf(prepMethod) === index; 
        });


    parent.innerHTML = 
    `<div id="game_page">
        <div id="menu_modal"></div>
        <div id="top_container">
            <div id="score"></div>
            <div id="timer"></div>
            <div id="bin"></div>
        </div>
        <div id="main_content">
            <div id="dining_room"></div>
            <div id="bar"></div>
            <div id="kitchen"></div>
            <div id="inventory"></div>
        </div>
    </div>`;

    PubSub.publish({
        event: "renderScore",
        details: "#score"
    });

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
            "data": prepMethods,
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
    event: "getGamePageParent",
    listener: () => {
        const parentId = "#menu_modal";

        PubSub.publish({
            event: "renderGameOverModal",
            details: parentId
        });
    }
})
