import './main.css';
import { NavigatorMenuComponent } from "./infraestructure/components/menu/menuNav.component";
import { router } from "./infraestructure/router/index.router";


let userIsLoged = false;

const init = () => {
        console.log("##### INIT");
        // menu navigator
        new NavigatorMenuComponent();
        // routing first time 
        router(window.location.hash);
        // routing when hash change
        window.addEventListener("hashchange", () => {
            const path = window.location.hash;
            switch (path) {
                case '#/game':
                    if (userIsLoged) {
                        router('#/game');
                    }
                    break;
                default:
                    router(path);
            }
        });

        document.addEventListener('access-permited', () => {
            // ### ACCESO AL JUEGO PERMITIDO
            userIsLoged = true;
            document.dispatchEvent(new CustomEvent('menu-item-game-actived'));

            // ### logica del storage


            router('#/game');
        });
    }
    // const notificar = function() {
    //     alert("El contenido cambió");
    // }

// window.addEventListener("load", init);

document.addEventListener("DOMContentLoaded", init);