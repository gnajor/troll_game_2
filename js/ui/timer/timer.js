import { PubSub } from "../../utils/pubsub.js";

export class Timer{
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

    startTimer(duration, onTick, onTimeOut){
        let elapsedTime = 0;

        //something weird with the timer undefined at the start

        PubSub.subscribe({
            event: "timeTicking",
            listener: function forEachTimeTick(){
                elapsedTime += 1;
                onTick(elapsedTime);
                
                if(elapsedTime >= duration){
                    onTimeOut(); 
                    PubSub.unsubscribe({
                        event: "timeTicking",
                        listener: forEachTimeTick
                    });  
                }
            }
        })

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


/* 
function renderTimer(parentId){
    const parent = document.querySelector(parentId);
    const gameDuration = 180;
    let timerCounter = 0;
    let gameTimer = 0;

    if(!parent){
        console.error("Parent Element Error");
        return;
    }

    const timerElement = document.createElement("div");
    timerElement.id = "timerContainer";
    timerElement.textContent = makeIntoMinutes(gameDuration);
    parent.appendChild(timerElement);

    const intervalId = setInterval(() => {
        timerCounter++;
        gameTimer = gameDuration - timerCounter;
        timerElement.textContent = makeIntoMinutes(gameTimer);

        PubSub.publish({
            event: "timeTicking",
            details: null
        });

        if(timerCounter === gameDuration){
            clearInterval(intervalId);
        }

    }, 1000);
}
*/