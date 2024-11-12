import { PubSub } from "../../../utils/pubsub.js";
import { Edible } from "../../../entities/edible/edible.js";

class PrepStation{
    constructor(details){
        const {parentId, data} = details
        this.parent = document.querySelector(parentId);
        this.prepMethod = data;
        this.beingUsed = false;
        this.elapsedTime = 0;
        this.renderPrepStation();
    }

    renderPrepStation(){
        if(this.parent){
            const station = document.createElement("div");
            station.id = "station_" + this.prepMethod;
            station.className = "station";
            station.textContent = this.prepMethod;
            this.parent.appendChild(station);

            station.addEventListener("dragover", (event) => event.preventDefault());
            station.addEventListener("drop", this.onDropCheckAndStartPrep.bind(this));   
        }
        else{
            console.error("Parent Element error");
        }
    }

    onDropCheckAndStartPrep(event){
        const id = Number(event.dataTransfer.getData("text/plain")); 
        const edibleInstance = Edible.edibleInstances.find(edible => edible.id === id);
        const process = edibleInstance.edible.processes[0].preparation;
        
        if(process === this.prepMethod && !this.beingUsed){
            edibleInstance.parent = event.target;
            this.startPreperation(edibleInstance);
        }
    }

    startPreperation(edibleInstance){
        const processTime = edibleInstance.edible.processes[0].time;
        edibleInstance.render();
        edibleInstance.beingProcessed = true;
        this.beingUsed = true;

        this.intervalId = setInterval(() => {
            this.elapsedTime += 1;
            edibleInstance.process(this.elapsedTime);

            if(this.elapsedTime >= processTime){
                this.completePreperation(edibleInstance);
            }

        }, 1000);
    }

    completePreperation(edibleInstance){
        clearInterval(this.intervalId);
        this.beingUsed = false;
        this.elapsedTime = 0;
        edibleInstance.beingProcessed = false;
        /* edibleInstance.finishProcessing(); */
    }
}

PubSub.subscribe({
    event: "renderPrepStations",
    listener: (details) => {
        const prepStation = new PrepStation(details);
    }
});