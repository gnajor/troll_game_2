import { pageHandler } from "../../../pageHandler/pageHandler.js";
import { PubSub } from "../../../utils/pubsub.js";

export function renderScoreboardPage(parentId, users){
    const parent = document.querySelector(parentId);

    parent.innerHTML = `<div id="scoreboard_page">
                            <div id="scoreboard_modal">
                                <div id="modal_content">
                                    <div id="top">
                                        <button id="back">Back</button>
                                        <h1>scoreboard</h1>
                                        <select id="filter_selector">
                                            <option value="game_1">game 1</option>
                                            <option value="game_2">game 2</option>
                                            <option value="game_3">game 3</option> 
                                        </select>
                                    </div>
                                    <table id="scoreboard">
                                        <thead>
                                            <tr>
                                                <th>Place</th>
                                                <th>Username</th>
                                                <th>Score</th>
                                            </tr>
                                        </thead>
                                        <tbody id="users"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>`;

    const selector = parent.querySelector("#filter_selector");
    const usersContainer = parent.querySelector("#users");
    const backButton = parent.querySelector("#back");
    renderUsers(users);

    selector.addEventListener("change", async (event) => {
        const gameMode = event.target.value.split("_")[1];
        const newPickedUsers = await pageHandler.handleGetScoreboardUsers(gameMode);
        usersContainer.innerHTML = "";
        renderUsers(newPickedUsers);
    });      
    
    backButton.addEventListener("click", () => {
        pageHandler.handleScoreBoardReset();
        pageHandler.handleMenuPageRender();
    });
}

function renderUsers(users){
    for(let i = 0; i < users.length; i++){
        PubSub.publish({
            event: "renderUser",
            details: {
                parent: "#users",
                data: users[i],
                index: i
            }
        });
    }
}
