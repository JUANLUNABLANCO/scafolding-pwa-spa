// este test es la suma de todos los otros, ya que no tenemos una api o una bd

describe('Router Component Testing: ', () => {
    beforeEach(() => {
        // npm run node:dev
        cy.visit('http://127.0.0.1:8080/#');
    });
    // form
    it('Nos dirigimos al home, esta prueba es importante hacerla sin llamar al gamePage, al final de la validación del formulario, sino no veremos los resultados en pantalla', () => {
        cy.get('[data-target="home"]').click();
        cy.contains('Home');
    });


    it('Cerramos el menu', () => {
        cy.get('#menu-toggler').click();
        cy.should('not.be.checked');
    });
    it('Nos focalizamos en el input name, tiene dos elementos el input[type=text] y el button[type=submit]', () => {
        cy.get('#nickName').should('contain', '').and('have.attr', 'required').and('include', 'required');
        cy.get('button[type=submit]').should('contain', 'Play');

    });
});