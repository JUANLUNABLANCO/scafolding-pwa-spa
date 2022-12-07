import './main.css';
import { NavigatorMenuComponent } from "./infraestructure/components/menu/menuNav.component";
import { router } from "./infraestructure/router/index.router";


const init = () => {
    // menu navigator
    const navigation = new NavigatorMenuComponent();


    // routing 
    router(window.location.hash);

    window.addEventListener("hashchange", (e) => {
        e.preventDefault();
        switch (window.location.hash) {
            case '#/game':
                if (navigation.userIsLoged) {
                    console.log(user.isLoged)
                    router('#/game');
                } else {
                    router('#/home');
                }
                break;
            default:
                router(window.location.hash);
        }
        // navigation.isLoged = true;

    });
}

window.addEventListener("load", init);