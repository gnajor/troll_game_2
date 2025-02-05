import { pageHandler } from "../../pageHandler/pageHandler.js";

export function renderStartPage(parentId){
    const parent = document.querySelector(parentId);

    parent.innerHTML = `<div id="start_page">
                            <div id="game_name">
                                <h1>THE TROLL GAME</h1>
                            </div>
                            <div id="sub_title">
                                <h2>Press any button to start</h2>
                            </div>
                            <img src="../../../media/images/characters/carrot.gif">
                            <img src="../../../media/images/characters/troll_3.gif">
                        </div>`;

    setTimeout(() => {
        parent.addEventListener("click", () => {
            pageHandler.handleMenuPageRender();
        }, {once: true});
    }, 100);
}