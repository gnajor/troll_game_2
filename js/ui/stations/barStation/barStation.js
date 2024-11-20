import { PubSub } from "../../../utils/pubsub.js";
import { Edible } from "../../../entities/edible/edible.js";
import { Timer } from "../../timer/timer.js";

class BarStation{
    constructor(details){
        this.parent = document.querySelector(details.parentId);
        this.beingUsed = false;
        this.id = details.id;
        this.render();
    }

    render(){
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

        if(!this.beingUsed && !edibleInstance.transformed && edibleInstance.prepared){
            this.startTransformation(edibleInstance);
            edibleInstance.startTransformation(event.target, this);
        }
    }

    startTransformation(edibleInstance){
        this.beingUsed = true;
        const duration = edibleInstance.edible.processes[1].time;

        const timer = new Timer();
        timer.startTimer(
            duration,
            function transform(time){
                edibleInstance.processTransformation(time, duration);
            }.bind(this),
            function finishTransformation(){
                edibleInstance.finishTransformation("transformation");
            }.bind(this)
        );
    }
}

PubSub.subscribe({
    event: "renderBarStations",
    listener: (details) => {
        const barStation = new BarStation(details);
    } 
});