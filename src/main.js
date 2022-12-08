import './main.css';
import { NavigatorMenuComponent } from "./infraestructure/components/menu/menuNav.component";
import { router } from "./infraestructure/router/index.router";


let userIsLoged = false;
let currentUserLoged = "";

const init = () => {
        // console.log"##### INIT");
        // menu navigator
        new NavigatorMenuComponent();
        // routing first time
        // window.location.hash;
        router(window.location.hash);
        // routing when hash change
        window.addEventListener("hashchange", (e) => {
            // e.preventDefault();
            console.log("########### PATH:  ", window.location.hash);
            switch (window.location.hash) {
                case '#/game':
                    if (userIsLoged) {
                        // console.log("entra aquí");
                        router('#/game');
                    } else {
                        window.location.hash = '#/home';
                    }
                    break;
            }
            router(window.location.hash);
        });

        document.addEventListener('access-permited', () => {
            // ### ACCESO AL JUEGO PERMITIDO
            userIsLoged = true;
            document.dispatchEvent(new CustomEvent('menu-item-game-actived'));
            // ### logica del storage, al entrar en Game()

            window.location.hash = '#/game';
        });
    }
    // const notificar = function() {
    //     alert("El contenido cambió");
    // }

// window.addEventListener("load", init);

document.addEventListener("DOMContentLoaded", init);