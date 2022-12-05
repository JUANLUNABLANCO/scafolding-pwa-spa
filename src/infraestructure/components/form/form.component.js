import formHTML from './form.component.html';
import formCSS from './form.component.css';

export class FormComponent extends HTMLElement {
    constructor() {
        super();

    }
    connectedCallback() { // Cuando se carga el componente, atributos modificables double binding
        this.innerHTML = formHTML;

    }

    // disconnectedCallback() {
    // metodo que se ejecuta cuando el componente sea eliminado del document
    // }

}
window.customElements.define("form-player", FormComponent);