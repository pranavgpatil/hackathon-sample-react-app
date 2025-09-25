describe('App E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should have correct page title', () => {
    cy.title().should('eq', 'My React App');
  });

  it('should have main heading with correct text', () => {
    cy.get('h1').should('contain.text', 'Welcome to Vue');
  })
});