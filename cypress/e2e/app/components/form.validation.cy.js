describe('Form Component Testing: ', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:8080/#');
    });
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