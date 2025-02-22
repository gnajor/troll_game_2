import { pageHandler } from "../../pageHandler/pageHandler.js";

export function renderGameModePage(parentId){
    const parent = document.querySelector(parentId);

    parent.innerHTML = `<div id="game_mode_page">
                            <div id="menu_modal">
                                <div id="menu_content">
                                    <button id="game_mode_1">game 1</button>
                                    <button id="game_mode_2">game 2</button>
                                    <button id="game_mode_3">game 3</button>
                                    <button id="back">back</button>
                                </div>
                            </div>
                        </div>`;

    const gameMode1 = parent.querySelector("#game_mode_1");
    const gameMode2 = parent.querySelector("#game_mode_2");
    const gameMode3 = parent.querySelector("#game_mode_3");
    const backButton = parent.querySelector("#back");

    gameMode1.addEventListener("click", onStartGameMode);
    gameMode2.addEventListener("click", onStartGameMode);
    gameMode3.addEventListener("click", onStartGameMode);

    function onStartGameMode(event){
        const gameMode = event.target.textContent.split(" ")[1];
        pageHandler.handleStoreGameMode(gameMode);
        pageHandler.handlePageAnimation(true, pageHandler.initGameAndRender);
        pageHandler.initGameOnServer();
    }

    backButton.addEventListener("click", () => {
        pageHandler.handleMenuPageRender();
    });
}