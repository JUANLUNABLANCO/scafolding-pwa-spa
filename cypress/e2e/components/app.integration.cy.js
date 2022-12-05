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
        cy.contains('Nick Name');
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
});