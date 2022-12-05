// este test es la suma de todos los otros, ya que no tenemos una api o una bd

describe('Router Component Testing: ', () => {
    beforeEach(() => {
        // npm run node:dev
        cy.visit('http://127.0.0.1:8080/#');
    });
    // form
    it('Abrimos el menu', () => {
        cy.get('#menu-toggler').click();
        cy.should('have.attr', 'checked').and('eq', 'checked');
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
});