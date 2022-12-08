import menuNavHTML from './menuNav.component.html';
import './menuNav.component.css';

export class NavigatorMenuComponent extends HTMLElement {
    constructor() {
        super();
        this.userIsLoged = false;
    }
    setActiveLink(active) {
        const itemDisabled = this.querySelector("[data-access-disabled='true']");
        const linkDisabled = itemDisabled.querySelector('a');
        // console.log(linkDisabled);
        if (active) {
            // console.log('##########', active);
            linkDisabled.classList.remove('not-active');
        } else {
            // console.log('##########', active);
            linkDisabled.classList.add('not-active');
        }
    }
    render() {
        this.innerHTML = menuNavHTML;
    }

    connectedCallback() { // Cuando se carga el componente, atributos modificables double binding
            // añadiendole cosas
            this.id = "menu-navigator";
            this.render();

            this.setActiveLink(this.userIsLoged);
            document.addEventListener('menu-item-game-actived', () => {
                this.userIsLoged = true;
                this.setActiveLink(this.userIsLoged);
            });
        }
        // disconnectedCallback() {
        // metodo que se ejecuta cuando el componente sea eliminado del document
        // }
}
// if ('customElements' in window) {
// 	window.customElements.define("home-page", HomeComponent);
// }
window.customElements.define("menu-nav", NavigatorMenuComponent);