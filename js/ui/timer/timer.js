import { PubSub } from "../../utils/pubsub.js";

export class Timer{

    static timers = {}

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

    makeIntoMinutes(time){
        const minutes = String(time/60).charAt(0);
        let seconds = String(time % 60);
    
        if(seconds.length === 1){
            seconds = "0" + seconds;
        }
        return `0${minutes}:${seconds}`;
    }

}


PubSub.subscribe({
    event: "renderTimer",
    listener: (parentId) => {
        const globalTimer = new Timer()
        globalTimer.render(parentId);
    }
});