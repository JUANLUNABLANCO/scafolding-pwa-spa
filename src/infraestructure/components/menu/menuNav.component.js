import menuNavHTML from './menuNav.component.html';
import menuNavCSS from './menuNav.component.css';

export class NavigatorMenuComponent extends HTMLElement {
    constructor() {
            super();
        }
        // static get observerAttributes(){ // lista de atributos a observar
        //   return [];
        // }
        // attributesChangeCallback(nameAtr, oldValue, newValue){ // atributos que podemos controlar
        //   switch(nameAtr) {
        //     case 'name':
        //       this.name = newValue;
        //       break;
        //     case "surname":
        //       this.surname = newValue;
        //       break;
        //     case "my-color":
        //       this.myColor = newValue;
        //       break;
        //   }
        // }
    connectedCallback() { // Cuando se carga el componente, atributos modificables double binding

        // añadiendole cosas
        this.id = "menu-navigator";
        this.innerHTML = menuNavHTML;
    }

    // disconnectedCallback() {
    // metodo que se ejecuta cuando el componente sea eliminado del document
    // }

}
// if ('customElements' in window) {
// 	window.customElements.define("home-page", HomeComponent);
// }
window.customElements.define("menu-nav", NavigatorMenuComponent);