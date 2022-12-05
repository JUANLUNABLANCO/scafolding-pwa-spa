// import { expect, should } from "chai"; // no es necesario porque viene integrado en cypress

describe('Router Component Testing: ', () => {
    beforeEach(() => {
        // npm run node:dev
        cy.visit('http://127.0.0.1:8080/#');
    });
    it('Abrimos el menu', () => {
        cy.get('#menu-toggler').click();
        cy.should('have.attr', 'checked').and('eq', 'checked');
    });
    it('Navegamos al Score-page, comprobamos que contiene un elemento visible con id"scoresPage"', () => {
        cy.get('[data-target="score"]').click();
        cy.contains('Scores');
        cy.get('.wrapper').should('to.be.visible').get('#scoresPage');

    });
    it('Cerramos el menu', () => {
        cy.get('#menu-toggler').click();
        cy.should('not.be.checked');
    });
});