// aplicación estilos
import './main.css';
// aplicacion componentes
import { NavigatorMenuComponent } from "./infraestructure/components/menu/menuNav.component";
import { router } from "./infraestructure/router/index.router";
import { ScoresService } from "./domain/services/storage.service.js";

// avriables de aplicación
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
            // console.log("########### PATH:  ", window.location.hash);
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
            currentUserLoged = document.getElementById('nickName').value;
            console.log("#### nombre de este individuo: ", currentUserLoged);
            userIsLoged = true;
            // anotamos en localstorage
            ScoresService.setLogedUser(currentUserLoged);

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