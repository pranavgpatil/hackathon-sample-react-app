describe('App E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display welcome message', () => {
    cy.contains('Welcome to React').should('be.visible');
  });

  it('should have correct page title', () => {
    cy.title().should('eq', 'My React App');
  });

  it('should have main heading with correct text', () => {
    cy.get('h1').should('contain.text', 'Welcome to React');
  })
});