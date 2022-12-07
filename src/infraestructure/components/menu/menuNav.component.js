import menuNavHTML from './menuNav.component.html';
import menuNavCSS from './menuNav.component.css';

export class NavigatorMenuComponent extends HTMLElement {
    constructor() {
        super();
        this.userIsLoged = false;
    }
    setActiveLink(active) {
        const itemDisabled = this.querySelector("[data-access-disabled='true']");
        const linkDisabled = itemDisabled.querySelector('a');
        console.log(linkDisabled);
        if (active) {
            console.log('##########', active);
            linkDisabled.classList.remove('not-active');
        } else {
            console.log('##########', active);
            linkDisabled.classList.add('not-active');
        }
    }
    connectedCallback() { // Cuando se carga el componente, atributos modificables double binding
        // añadiendole cosas
        this.id = "menu-navigator";
        this.innerHTML = menuNavHTML;

        this.setActiveLink(this.userIsLoged);
    }

    // disconnectedCallback() {
    // metodo que se ejecuta cuando el componente sea eliminado del document
    // }

}
// if ('customElements' in window) {
// 	window.customElements.define("home-page", HomeComponent);
// }
window.customElements.define("menu-nav", NavigatorMenuComponent);