import formHTML from './form.component.html';
import './form.component.css';

import { ScoresService } from '../../../domain/services/storage.service.js';

export class FormComponent extends HTMLElement {
    constructor() {
        super();
        this.inputNickName;
        this.form;
        this.submit;
        this.isValid = 'false';
        this.MAXCHARNAMEFIELD = 8;
        this.MINCHARNAMEFIELD = 3;
        // console.log(MAXCHARNAMEFIELD, MINCHARNAMEFIELD);
        this.permitedChars;
        this.nickNameValue;

        // userLoged for storage
        this.userLoged = {};


    }
    static get ObservedAttributes() {
        return ['isValid'];
    }
    attributeChangeCallback(nameAttr, oldVal, newVal) {
        switch (nameAttr) {
            case 'isValid':
                this.isValid = newVal;
                break;
        }
    }
    validateInputs = () => {
        this.isValid = 'false';
        // console.log('se está validando');
        this.nickNameValue = this.inputNickName.value.trim();
        // console.log(this.nickNameValue);

        if (this.nickNameValue === '') {
            this.setError(this.inputNickName, 'Nick Name is required');
        } else if (this.nickNameValue.length < this.MINCHARNAMEFIELD) {
            this.setError(this.inputNickName, `Min length of nick name are ${this.MINCHARNAMEFIELD}`);
        } else if (this.nickNameValue.length > this.MAXCHARNAMEFIELD) {
            this.setError(this.inputNickName, `Max length of nick name are ${this.MAXCHARNAMEFIELD}`);
        } else if (!this.isTestValid(this.nickNameValue)) {
            console.log(this.nickNameValue);
            this.setError(this.inputNickName, `Some Characters, not permited! only [a-z][A-z][_]`);
        } else {
            this.setAttribute('isValid', this.isValid);
            // alert('VALIDADO');
            this.setSuccess(this.inputNickName);
            // enviar datos to class Scores
            this.isValid = 'true';
        }
    }
    setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    }
    setSuccess = element => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    }
    isTestValid = (texto) => {
        var count = 0;
        for (var i = 0; i < texto.length; i++) {
            const word = texto.charAt(i);
            if (this.permitedChars.indexOf(word) < 0) {
                count++;
                // console.log(`index ${i}  word  ${word}  count ${count}`);
            }
        }
        const valid = count > 0 ? false : true;
        return valid;
    }
    connectedCallback() { // Cuando se carga el componente, atributos modificables double binding
            // console.log('formulario conectado');
            this.innerHTML = formHTML;

            this.form = this.querySelector('#formName');
            this.inputNickName = this.querySelector('#nickName');
            this.submit = this.querySelector('#submitButton');
            // console.log('form: ', form, inputNickName, submit);
            this.MAXCHARNAMEFIELD = this.inputNickName.getAttribute('max');
            this.MINCHARNAMEFIELD = this.inputNickName.getAttribute('min');
            // console.log(MAXCHARNAMEFIELD, MINCHARNAMEFIELD);
            this.permitedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
            // para el tooltip
            this.form.addEventListener('mouseover', event => {
                    event.preventDefault();
                })
                // envio del formulario y validación
            this.form.addEventListener('submit', event => {
                event.preventDefault();
                // console.log('Submit button clicked');
                // validacion
                this.validateInputs();
                // result
                // console.log(this.isValid);
                if (this.isValid == 'true') {
                    this.userLoged = {
                        nickName: this.nickNameValue,
                        highScore: 0
                    }
                    const result = ScoresService.set(this.userLoged.nickName, this.userLoged.points);
                    console.log('RESULT: ', result);

                    this.userLoged = {...result };
                    // ver listado de usuarios y si no está el nuevo se graba

                    console.log(this.userLoged);
                    console.log('all items:', ScoresService.getAll());
                    // const currentUserLoged = 
                    document.dispatchEvent(new CustomEvent('access-permited'));
                }

            });
        }
        // disconnectedCallback() { // metodo que se ejecuta cuando el componente sea eliminado del document
        //     this.form.removeEventListener();
        // }

}
window.customElements.define("form-player", FormComponent);



//  const submit = document.querySelector('submitButton');