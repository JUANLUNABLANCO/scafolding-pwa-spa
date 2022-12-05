import formHTML from './form.component.html';
import './form.component.css';

export class FormComponent extends HTMLElement {
    constructor() {
        super();
        this.inputNickName;
        this.form;
        this.submit;
        this.isValid = false;
        this.MAXCHARNAMEFIELD = 8;
        this.MINCHARNAMEFIELD = 3;
        // console.log(MAXCHARNAMEFIELD, MINCHARNAMEFIELD);
        this.permitedChars;

    }
    validateInputs = () => {
        this.isValid = false;
        console.log('se está validando');
        const nickNameValue = this.inputNickName.value.trim();
        console.log(nickNameValue);

        if (nickNameValue === '') {
            this.setError(this.inputNickName, 'Nick Name is required');
        } else if (nickNameValue.length < this.MINCHARNAMEFIELD) {
            this.setError(this.inputNickName, `Min length of nick name are ${this.MINCHARNAMEFIELD}`);
        } else if (nickNameValue.length > this.MAXCHARNAMEFIELD) {
            this.setError(this.inputNickName, `Max length of nick name are ${this.MAXCHARNAMEFIELD}`);
        } else if (!this.isTestValid(nickNameValue)) {
            console.log(nickNameValue);
            this.setError(this.inputNickName, `Some Characters, not permited! only [a-z][A-z][_]`);
        } else {
            alert('VALIDADO');
            this.setSuccess(this.inputNickName);
            // enviar datos to class Scores
            this.isValid = true;
            // SCORES.setScore(nickNameValue, 0);
            // ROUTER.load('play');
            // console.log(accessGame);
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
                console.log(`index ${i}  word  ${word}  count ${count}`);
            }
        }
        const valid = count > 0 ? false : true;
        return valid;
    }
    connectedCallback() { // Cuando se carga el componente, atributos modificables double binding
        this.innerHTML = formHTML;

        this.form = this.querySelector('#formName');
        this.inputNickName = this.querySelector('#nickName');
        this.submit = this.querySelector('#submitButton');
        // console.log('form: ', form, inputNickName, submit);
        this.MAXCHARNAMEFIELD = this.inputNickName.getAttribute('max');
        this.MINCHARNAMEFIELD = this.inputNickName.getAttribute('min');
        // console.log(MAXCHARNAMEFIELD, MINCHARNAMEFIELD);
        this.permitedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';

        this.form.addEventListener('mouseover', event => {
            event.preventDefault();
        })

        this.form.addEventListener('submit', event => {
            event.preventDefault();
            console.log('Submit button clicked');
            // validacion
            this.validateInputs();
            // result
            console.log(this.isValid);
            return this.isValid;
        });



    }

    // disconnectedCallback() {
    // metodo que se ejecuta cuando el componente sea eliminado del document
    // }

}
window.customElements.define("form-player", FormComponent);



//  const submit = document.querySelector('submitButton');