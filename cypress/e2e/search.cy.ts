describe('search products', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('to search for products', () => {
    cy.searchByQuery('moletom')

    cy.location('pathname').should('include', '/search')
    cy.location('search').should('include', 'q=moletom')

    cy.get('a[href^="/product"]').should('exist')
  })

  it('not be able to visit search page without a seacrh query', () => {
    cy.on('uncaught:exception', () => {
      return false
    })

    cy.visit('search')
    cy.location('pathname').should('equal', '/')
  })
})
