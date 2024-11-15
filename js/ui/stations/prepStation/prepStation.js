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
        
        if(process === this.prepMethod && !this.beingUsed && !edibleInstance.processed){
            edibleInstance.parent = event.target;
            this.startPreperation(edibleInstance);
        }
    }

    startPreperation(edibleInstance){
        this.beingUsed = true;
        const processTime = edibleInstance.edible.processes[0].time;
        edibleInstance.render();
        edibleInstance.beingProcessed = true;
        edibleInstance.currentStation = this;
        edibleInstance.process(this.elapsedTime);

        this.timeHandler = function (){
            this.elapsedTime += 1;
            edibleInstance.process(this.elapsedTime);
            console.log("cum")
            
            if (this.elapsedTime >= processTime) {
                this.completePreparation(edibleInstance);
            }
        }


        PubSub.subscribe({
            event: "timeTicking",
            listener: this.timeHandler.bind(this), //can't use bind as it creates a referense or something
        });
    }

    completePreparation(edibleInstance){
/*         PubSub.unsubscribe({
            event: "timeTicking",
            listener: this.timeHandler
        }); */

        this.cum = false;
        this.elapsedTime = 0;
        edibleInstance.beingProcessed = false;
        edibleInstance.finishProcessing();
    }
}

PubSub.subscribe({
    event: "renderPrepStations",
    listener: (details) => {
        const prepStation = new PrepStation(details);
    }
});