// este test es la suma de todos los otros, ya que no tenemos una api o una bd

describe('Router Component Testing: ', () => {
    beforeEach(() => {
        // npm run node:dev
        cy.visit('http://127.0.0.1:8080/#');
    });
    // menu
    it('Abrimos el menu', () => {
        cy.get('#menu-toggler').click();
        cy.should('have.attr', 'checked').and('eq', 'checked');
    });
    it('Comprueba que se abre la app y que contiene la palabra Home', () => {
        // expect(true).to.equal(true);
        cy.contains('Home');
    });
    it('Navegamos al Home page', () => {
        cy.get('[data-target="home"]').click();
        cy.contains('Home');
    });
    it('Cerramos el menu', () => {
        cy.get('#menu-toggler').click();
        cy.should('not.be.checked');
    });
    // game
    it('Abrimos el menu', () => {
        cy.get('#menu-toggler').click();
        cy.should('have.attr', 'checked').and('eq', 'checked');
    });
    it('Navegamos al Game page, comprobamos que contiene un elemento visible con id"start"', () => {
        cy.get('[data-target="game"]').click();
        cy.contains('Game');
        cy.contains('Start Game');
        cy.get('#start').should('to.be.visible');
    });
    it('Cerramos el menu', () => {
        cy.get('#menu-toggler').click();
        cy.should('not.be.checked');
    });
    // scores
    it('Abrimos el menu', () => {
        cy.get('#menu-toggler').click();
        cy.should('have.attr', 'checked').and('eq', 'checked');
    });
    it('Navegamos al Score-page, comprobamos que contiene un elemento visible con id"scoresPage"', () => {
        cy.get('[data-target="scores"]').click();
        cy.contains('Scores');
        cy.get('figure').should('to.be.visible');
        cy.get('#scoresPage');

    });
    it('Cerramos el menu', () => {
        cy.get('#menu-toggler').click();
        cy.should('not.be.checked');
    });
    // form UI
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
        cy.get('button[type=submit]').should('contain', 'Let me Play');

    });
    // form validation 
    it('Nos dirigimos al home, esta prueba es importante hacerla sin llamar al ROUTER, es decir sin clickar los botones de  navegación de la UI, sino no veremos los resultados en pantalla', () => {
        cy.get('[data-target="home"]').click();
        cy.contains('Home');
    });
    it('Nos focalizamos en el input name, para introducir datos ficticios correctos JMLB_Moon (datos permitidos), usando la interfaz UI, del formulario, comprobando que el mensaje de error está vacío y la clase que da color verde al borde del iput-control', () => {
        cy.get('#nickName').should('contain', '').focus().type('JMLB_Moon');
        cy.get('#submitButton').click();
        cy.get('.error').first().should('contain', '');
        cy.get('.input-control').first().should('have.class', 'success')

    });
    it('Ahora introduciremos datos incorrectos JMLB/1234, comprobando el mensaje de error y la clase que da color rojo al borde del iput-control', () => {
        cy.get('#nickName').should('contain', '').focus().type('JMLB/1234');
        cy.get('#submitButton').click();
        cy.get('.error').first().should('contain', '[a-z][A-z][_]').and('be.visible');
        cy.get('.input-control').first().should('have.class', 'error');
    });
});