import { pageHandler } from "../../../pageHandler/pageHandler.js";
import { PubSub } from "../../../utils/pubsub.js";

function renderGameOverModal(parentId){
    const parent = document.querySelector(parentId);

    parent.innerHTML = `<div id="menu_content">
                            <div id="display_score"></div>
                            <button id="play_again">play again</button>
                            <button id="back_to_menu_button">back to menu</button>
                        </div>`;

    const playAgainButton = parent.querySelector("#play_again");
    const backToMenuButton = parent.querySelector("#back_to_menu_button");

    PubSub.publish({
        event: "renderScore",
        details: "#display_score"
    });

    playAgainButton.addEventListener("click", () => {
        pageHandler.handlePageAnimation(true, pageHandler.initGameAndRender);
        pageHandler.handleGamePlayAgain();
        pageHandler.initGameOnServer();
    });

    backToMenuButton.addEventListener("click", () => {
        pageHandler.handleMenuPageRender(true);
    });
}

PubSub.subscribe({
    event: "renderGameOverModal",
    listener: (parentId) => {
        renderGameOverModal(parentId);
    }
})