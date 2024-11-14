import { PubSub } from "../../utils/pubsub.js";

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
        renderTimer(parentId)
    }
});