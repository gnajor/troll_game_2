import { PubSub } from "../../../utils/pubsub.js";
import { Edible } from "../../../entities/edible/edible.js";

class BarStation{
    constructor(details){
        this.parent = document.querySelector(details.parentId);
        this.elapsedTime = 0;
        this.beingUsed = false;
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
        const transform = edibleInstance.edible.processes[0].transform;

        edibleInstance.parent = event.target;
        this.startTransformation(edibleInstance);
    }

    startTransformation(edibleInstance){
        edibleInstance.render();
        edibleInstance.beingTransformed = true;

        this.intervalId = setInterval(() => {
            this.elapsedTime += 1;
            //edibleInstance.process(this.elapsedTime);

            if(this.elapsedTime >= processTime){
                this.completePreperation(edibleInstance);
            }

        }, 1000);
    }
}

PubSub.subscribe({
    event: "renderBarStations",
    listener: (details) => {
        const barStation = new BarStation(details);
    } 
});