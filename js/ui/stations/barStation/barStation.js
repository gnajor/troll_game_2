import { PubSub } from "../../../utils/pubsub.js";
import { Edible } from "../../../entities/edible/edible.js";
import { Timer } from "../../timer/timer.js";

class BarStation{
    constructor(details){
        this.parent = document.querySelector(details.parentId);
        this.beingUsed = false;
        this.id = details.id;
        this.stationElement = this.create(); 
        this.destroyed = false;
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
                edibleInstance.finishTransformation();
                this.startDisposal(edibleInstance);
            }.bind(this)
        );
    }

    startDisposal(edibleInstance){
        const method = edibleInstance.edible.processes[2].disposal;
        const duration = edibleInstance.edible.processes[2].time;


        if(method === "Taken out"){
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

        else if(method === "Remains"){
            edibleInstance.destroy();
            this.stationElement.textContent = "X";
            this.stationElement.classList.add("destroyed");
            this.destroyed = true;
        }

        else if(method === "Given away"){
            
        }
    }
}

PubSub.subscribe({
    event: "renderBarStations",
    listener: (details) => {
        const barStation = new BarStation(details);
        barStation.render();
    } 
});