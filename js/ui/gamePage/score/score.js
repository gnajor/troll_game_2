import { PubSub } from "../../../utils/pubsub.js";

function renderScore(parentId){
    const parent = document.querySelector(parentId);

    const score = document.createElement("div");
    score.id = "score_container";
    score.textContent = 0;
    parent.appendChild(score);
}

PubSub.subscribe({
    event: "renderScore",
    listener: (parent) => {
        renderScore(parent);
    }
});

PubSub.subscribe({
    event: "renderNewScore",
    listener: (score) => {
        const scoreContainer = document.querySelector("#score_container");
        scoreContainer.textContent = score;
    } 
});