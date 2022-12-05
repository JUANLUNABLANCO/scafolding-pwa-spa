// import { expect, should } from "chai"; // no es necesario porque viene integrado en cypress

describe('Router Component Testing: ', ()=>{
  beforeEach(()=>{
    // npm run node:dev
    cy.visit('http://127.0.0.1:8080/#');
  });
  it('Abrimos el menu', ()=>{
    cy.get('#menu-toggler').click();
    cy.should('have.attr', 'checked').and('eq', 'checked');
  });
  it('Navegamos al Game page, comprobamos que contiene un elemento visible con id"start"', ()=>{
    cy.get('[data-target="game"]').click();
    cy.contains('Game');
    cy.contains('Start Game');
    cy.get('#start').should('to.be.visible');
  });
  it('Cerramos el menu', ()=>{
    cy.get('#menu-toggler').click();
    cy.should('not.be.checked');
  });
});
