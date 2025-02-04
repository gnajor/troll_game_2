import { pageHandler } from "../../pageHandler/pageHandler.js";

export function renderRegisterPage(parentId){
    const parent = document.querySelector(parentId);

    parent.innerHTML = `<div id="register_page">
                            <div class="modal">
                                <div class="modal_content">
                                    <div class="title">
                                        <h2>Get Started</h2>
                                    </div>
                                    <div class="input_container">
                                        <input placeholder="Username" id="username">
                                        <input placeholder="Password" id="password" type="password">
                                    </div>
                                    <button id="register">Register</button>
                                    <button id="back">back</button>
                                </div>
                            </div>
                        </div>`;

    const registerButton = parent.querySelector("#register");
    const inputUsername = parent.querySelector("#username");
    const inputPassword = parent.querySelector("#password");
    const backButton = parent.querySelector("#back");

    registerButton.addEventListener("click", async () => {
        const password = inputPassword.value;
        const username = inputUsername.value;

        pageHandler.handleRegiser(username, password);
    });

    backButton.addEventListener("click", () => {
        pageHandler.handleMenuPageRender();
    });
}