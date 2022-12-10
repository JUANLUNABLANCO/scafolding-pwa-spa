import homeHTML from './home.component.html';
import './home.component.css';
import '../../components/form/form.component.js';

export class HomeComponent extends HTMLElement {
    constructor() {
        super();

    }
    connectedCallback() { // Cuando se carga el componente, atributos modificables double binding
        // añadiendole cosas
        // console.log("componente cargado");
        this.innerHTML = homeHTML; // + `<br><h3>Hello ${this.name} ${this.surname}</h3>`
        // const divElement =document.createElement('div');
        // console.log(this.innerHTML);
        // console.log(this);
        this.id = "homePage";
    }

    // disconnectedCallback() {
    // metodo que se ejecuta cuando el componente sea eliminado del document
    // }

}
window.customElements.define("home-page", HomeComponent);