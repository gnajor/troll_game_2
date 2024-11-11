import { PubSub } from "../../../utils/pubsub.js";
import { Edible } from "../../../entities/edible/edible.js";

class PrepStation{
    beingUsed = false;

    constructor(details){
        const {parentId, data} = details
        this.parent = document.querySelector(parentId);
        this.prep = data;
        this.renderPrepStation();
    }

    renderPrepStation(){
        if(this.parent){
            const station = document.createElement("div");
            station.id = "station_" + this.prep;
            station.className = "station";
            station.textContent = this.prep;
            this.parent.appendChild(station);

            station.addEventListener("dragover", (event) => event.preventDefault());
            station.addEventListener("drop", this.onDropCheckAndAppend.bind(this));   
        }
        else{
            console.error("Parent Element error");
        }
    }

    onDropCheckAndAppend(event){
        const id = Number(event.dataTransfer.getData("text/plain")); 
        const edibleInstance = Edible.edibleInstances.find(edible => edible.id === id);
        const process = edibleInstance.edible.processes[0].preparation;
        
        if(process === this.prep && !this.beingUsed){
            edibleInstance.parent = event.target;
            edibleInstance.render();

            this.beingUsed = true;
        }
    }
}

PubSub.subscribe({
    event: "renderPrepStations",
    listener: (details) => {
        const prepStation = new PrepStation(details);
    }
});