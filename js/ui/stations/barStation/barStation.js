import { PubSub } from "../../../utils/pubsub.js";
import { Edible } from "../../../entities/edible/edible.js";

class BarStation{
    constructor(details){
        this.parent = document.querySelector(details.parentId);
        this.beingUsed = false;
        this.id = details.id;
        this.stationElement = this.create(); 
        this.destroyed = false;
        this.timerId = null;
    }

    create(){
        const barStation = document.createElement("div");
        barStation.className = "barStation";
        barStation.id = "barStation" + (this.id + 1);
        barStation.textContent = "barStation_" + this.id;

        barStation.addEventListener("dragover", (event) => event.preventDefault());
        barStation.addEventListener("drop", this.onDropCheckAndStartTrans.bind(this));
        
        return barStation;
    }


    render(){
        if(this.parent){
            this.parent.appendChild(this.stationElement);
        }
        else{
            console.error("Parent Element error")
        }
    }

    onDropCheckAndStartTrans(event){
        const id = Number(event.dataTransfer.getData("text/plain")); 
        const edibleInstance = Edible.edibleInstances.find(edible => edible.id === id);

        if(!this.beingUsed && !edibleInstance.transformed && edibleInstance.prepared && !this.destroyed){
            this.startUsing();
            edibleInstance.startProcess("trans", event.target, this);
        }
    }

    destroy(){
        this.stationElement.textContent = "X";
        this.stationElement.classList.add("destroyed");
        this.destroyed = true;
    }

    startUsing(){
        this.beingUsed = true;
    }

    finishedUsing(){
        this.beingUsed = false; 
    }
}

PubSub.subscribe({
    event: "renderBarStations",
    listener: (details) => {
        const barStation = new BarStation(details);
        barStation.render();
    } 
});