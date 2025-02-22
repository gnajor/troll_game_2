import { PubSub } from "../../../utils/pubsub.js";

export function renderScoreboardUser(parentId, user, index){
    const parent = document.querySelector(parentId);
    parent.innerHTML += `<tr>
                            <td>${index + 1}</td>
                            <td>${user.name}</td>
                            <td>${user.score}</td>
                        </tr>`; 
}

PubSub.subscribe({
    event: "renderUser",
    listener: (details) => {
        renderScoreboardUser(details.parent, details.data, details.index);
    }
})