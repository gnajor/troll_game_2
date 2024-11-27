import { PubSub } from "../../utils/pubsub.js";

export class Timer{

    static timers = [];

    static StartGameTimer(){
        setInterval(() => {

            PubSub.publish({
                event: "timeTicking",
                details: null
            });
        }, 1000);
    }

    constructor(duration, onTick, onTimeOut){
        this.duration = duration;
        this.onTick = onTick;
        this.onTimeOut = onTimeOut;
        this.progressElement = null;
        this.active = false;
        this.elapsedTime = 0;
    }

    start(){
        this.active = true;

        PubSub.subscribe({
            event: "timeTicking",
            listener: this.tick,
        });
    }

    stop(){
        this.active = false;
        this.elapsedTime = 0;

        PubSub.unsubscribe({
            event: "timeTicking",
            listener: this.tick, 
        });
    }

    pause(){
        this.active = false; 
    }

    resume(){
        if (!this.active) {
            this.active = true; 
        }
    }

    tick = () => {
        if (this.active) {
            this.elapsedTime++;
            this.onTick(this.elapsedTime);
            this.renderProgressbar();

            if (this.elapsedTime >= this.duration) {
                this.onTimeOut();
                this.stop();
            }
        }
    }

    createProgressbar(parent, method) {
        let progressBar = parent.querySelector(".progressBar");

        if (!progressBar) {
            progressBar = document.createElement("div");
            const progression = document.createElement("div");
            progressBar.className = "progressBar";
            progression.className = "progress";

            parent.appendChild(progressBar);
            progressBar.appendChild(progression);

            this.progressElement = progression; 
        } 
        
        else {
            this.progressElement = progressBar.querySelector(".progress");
        }

        switch(method){
            case "trans":
                this.progressElement.classList.add("rotting");
                break;
            case "dispose":
                this.progressElement.classList.add("dispose");
                break;
        }

        this.progressElement.style.width = "0%";
    }

    renderProgressbar() {
        if (this.progressElement) {
            this.progressElement.style.width = (this.elapsedTime / this.duration) * 100 + "%";
        }
    }
}



/* 
class Edible should have timer


ontick => pubsub.publish({event: "Tick"})


class Timer{
    static startGameTimer(){
        setInterval(() => {

        })
    }

    constructor(onTick, onEnd){
        this.active = true; <= startar direkt
    }



    getTimeLeft()

    pause(){
        //unsubscribe
        //
    }

    renderProgressBar(){
        
    }
}

 class Game{
    constructor(){
        this.timer = new Timer(ontick, onEnd)
    }
}





*/