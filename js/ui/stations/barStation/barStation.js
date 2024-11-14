import { PubSub } from "../../../utils/pubsub.js";
import { Edible } from "../../../entities/edible/edible.js";

class BarStation{
    constructor(details){
        this.parent = document.querySelector(details.parentId);
        this.elapsedTime = 0;
        this.beingUsed = false;
        this.elapsedTime = 0;
        this.id = details.id;
        this.renderBar();
    }

    renderBar(){
        if(this.parent){
            const barStation = document.createElement("div");
            this.parent.appendChild(barStation);
            barStation.className = "barStation";
            barStation.id = "barStation" + (this.id + 1);
            barStation.textContent = "barStation_" + this.id;

            barStation.addEventListener("dragover", (event) => event.preventDefault());
            barStation.addEventListener("drop", this.onDropCheckAndStartTrans.bind(this)); 
        }
        else{
            console.error("Parent Element error")
        }
    }

    onDropCheckAndStartTrans(event){
        const id = Number(event.dataTransfer.getData("text/plain")); 
        const edibleInstance = Edible.edibleInstances.find(edible => edible.id === id);

        if(!this.beingUsed && !edibleInstance.transformed){
            edibleInstance.parent = event.target;
            edibleInstance.currentStation.completePreparation(edibleInstance);
            edibleInstance.currentStation.beingUsed = false;
            this.startTransformation(edibleInstance);
        }
    }

/*     startTransformation(edibleInstance){
        this.beingUsed = true;
        const transformTime = edibleInstance.edible.processes[1].time;
        edibleInstance.render();
        edibleInstance.beingTransformed = true;
        edibleInstance.currentStation = this;
        edibleInstance.transform(this.elapsedTime);

        PubSub.subscribe({
            event: "timeTicking",
            listener: this.timeHandler
        });

        this.timeHandler = function (){
            this.elapsedTime += 1;
            edibleInstance.transform(this.elapsedTime);
    
            if(this.elapsedTime >= transformTime){
                this.completeTransformation(edibleInstance);
            }
        }
    }

    completeTransformation(edibleInstance){
        

        PubSub.unsubscribe({
            event: "timeTicking",
            listener: this.timeHandler
        });
    } */
}

PubSub.subscribe({
    event: "renderBarStations",
    listener: (details) => {
        const barStation = new BarStation(details);
    } 
});