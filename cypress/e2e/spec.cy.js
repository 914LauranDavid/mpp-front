describe('nice cat tests', () => {
  it('passes', () => {
    cy.visit('/')

    cy.contains('type')
  })
})