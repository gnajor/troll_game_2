import { PubSub } from "../../../utils/pubsub.js";
import { Edible } from "../../../entities/edible/edible.js";
import { Timer } from "../../timer/timer.js";

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
        const process = edibleInstance.edible.processes[0].preparation;
        
        if(process === this.prepMethod && !this.beingUsed && !edibleInstance.prepared){
            this.startPreperation(edibleInstance);
            edibleInstance.startPreperation(event.target, this);
        }
    }

    startPreperation(edibleInstance){
        this.beingUsed = true;
        const duration = edibleInstance.edible.processes[0].time;

        Timer.startTimer(
            duration, 
            function preperate(time){
                edibleInstance.processPreparation(time, duration);    
            }.bind(this), 
            function finishPreparation(){
                edibleInstance.finishPreperation("preparation");
            }.bind(this)
        );

/*         setTimeout(() => {
            const timer2 = new Timer();

            timer2.stopTimer(timerId);
            console.log("Timer stopped early!");
        }, 5000); */
    }
}

PubSub.subscribe({
    event: "renderPrepStations",
    listener: (details) => {
        const prepStation = new PrepStation(details);

    }
});