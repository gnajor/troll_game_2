import { PubSub } from "../../utils/pubsub.js";

export class Timer{

    static StartGameTimer(){
        setInterval(() => {
            console.log("tick")

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
        this.progressBarElement = null;
        this.active = false;
        this.elapsedTime = 0;
    }

    start(){
        this.active = true; 

        const forEachTick = () =>{
            if(this.active){
                this.elapsedTime++;
                this.onTick(this.elapsedTime);

                if(this.elapsedTime >= this.duration){
                    this.stop();
                }
            }
            else{
                PubSub.unsubscribe({
                    event: "timeTicking",
                    listener: forEachTick
                }); 
            }
        }

        PubSub.subscribe({
            event: "timeTicking",
            listener: forEachTick
        });
    }

    stop(){
        this.active = false;
        this.onTimeOut();
    }

    addProgressbar(parent, method){
        const progressBar = document.createElement("div");
        const progression = document.createElement("div");
        progressBar.className = "progressBar";
        progression.className = "progress";
        parent.appendChild(progressBar);
        progressBar.appendChild(progression);

        progression.style.width = (this.elapsedTime / this.duration) * 100 + "%";
    }
}


/* export class Timer{

    static timers = {}

    static startTimer(duration, onTick, onTimeOut) {
        const timerId = Symbol("TimerID"); 
        let elapsedTime = 0;

        const listener = () => {
            elapsedTime++;
            onTick(elapsedTime);

            if (elapsedTime >= duration) {
                Timer.stopTimer(timerId); 
                onTimeOut();
            }
        };

        PubSub.subscribe({
            event: "timeTicking",
            listener: listener
        });

        Timer.timers[timerId] = { listener };
        return timerId; 
    }

    static stopTimer(timerId) {
        const timer = Timer.timers[timerId];
        if (timer) {
            PubSub.unsubscribe({
                event: "timeTicking",
                listener: timer.listener
            }); 
            delete Timer.timers[timerId]; 
        }
    }

    constructor(){
        this.gameDuration = 180;
        this.timerCounter = 0;
    }

    render(parentId){
        const parent = document.querySelector(parentId);

        if(!parent){
            console.error("Parent Element Error");
            return;
        }
        const timerElement = document.createElement("div");
        timerElement.id = "timerContainer";
        timerElement.textContent = this.makeIntoMinutes(this.gameDuration);
        parent.appendChild(timerElement);

        this.startGlobalTimer(timerElement);
    }

    startGlobalTimer(timerElement){
        let gameTimer = 0;

        const intervalId = setInterval(() => {
            this.timerCounter++;

            gameTimer = this.gameDuration - this.timerCounter;
            timerElement.textContent = this.makeIntoMinutes(gameTimer);

            PubSub.publish({
                event: "timeTicking",
                details: null
            });

            if(this.timerCounter === this.gameDuration){
                clearInterval(intervalId);
            }
        }, 1000);
    }

    makeIntoMinutes(time){
        const minutes = String(time/60).charAt(0);
        let seconds = String(time % 60);
    
        if(seconds.length === 1){
            seconds = "0" + seconds;
        }
        return `0${minutes}:${seconds}`;
    }

} */



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