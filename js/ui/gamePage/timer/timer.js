import { PubSub } from "../../../utils/pubsub.js";
import { Timer } from "../../../entities/timer/timer.js";

function renderTimer(parentId){
    const parent = document.querySelector(parentId);
    const gameDuration = 180;

    if(!parent){
        console.error("Parent Element Error");
        return;
    }

    const timerElement = document.createElement("div");
    timerElement.id = "timerContainer";
    timerElement.textContent = makeIntoMinutes(180);
    parent.appendChild(timerElement);

    const mainTimer = new Timer(
        gameDuration,
        function forEachTick(elapsedTime){
            timerElement.textContent = makeIntoMinutes(gameDuration - elapsedTime);
        },
        function(){
            console.log("game over");
        }
    );

    mainTimer.start();
}

function makeIntoMinutes(time){
    const minutes = String(time/60).charAt(0);
    let seconds = String(time % 60);

    if(seconds.length === 1){
        seconds = "0" + seconds;
    }
    return `0${minutes}:${seconds}`;
} 

PubSub.subscribe({
    event: "renderTimer",
    listener: (parentId) => {
        renderTimer(parentId);
    }
});