import { PubSub } from "../../../../utils/pubsub.js";
import { Edible } from "../../../../entities/edible/edible.js";

class PrepStation{
    constructor(details){
        const {parentId, data} = details
        this.parent = document.querySelector(parentId);
        this.prepMethod = data;
        this.beingUsed = false;
        this.render();
    }

    render(){
        const station = document.createElement("div");
        station.id = "station_" + this.prepMethod;
        station.className = "station";
        station.textContent = this.prepMethod;
        this.parent.appendChild(station);

        station.addEventListener("dragover", (event) => event.preventDefault());
        station.addEventListener("drop", this.onDropCheckAndStartPrep.bind(this));  
    }

    onDropCheckAndStartPrep(event){
        const id = Number(event.dataTransfer.getData("text/plain")); 
        const edibleInstance = Edible.edibleInstances.find(edible => edible.id === id);
        const method = edibleInstance.edible.prep_method;
        
        if(method === this.prepMethod && !this.beingUsed && !edibleInstance.prepared){
            this.startUsing();
            edibleInstance.startProcess("prep", event.target, this);
        }
    }

    startUsing(){
        this.beingUsed = true;
    }

    finishedUsing(){
        this.beingUsed = false; 
    }
}

PubSub.subscribe({
    event: "renderPrepStations",
    listener: (details) => {
        const prepStation = new PrepStation(details);
    }
});