describe('add product to cart', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('navigate to product page and add to cart', () => {
    cy.get('a[href^="/product"]').first().click()

    cy.url().should('include', '/product')
    cy.contains('Adicionar ao carrinho', {
      matchCase: false,
    }).click()

    cy.contains('Cart (1)').should('exist')
  })

  it('navigate to product page although not count duplicated in cart', () => {
    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')
    cy.contains('Adicionar ao carrinho', {
      matchCase: false,
    }).click()
    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('to search for a product and add it to the cart', () => {
    cy.get('input[name=q]').type('camise').parent('form').submit()

    cy.get('a[href^="/product"]').first().click()
    cy.location('pathname').should('include', '/product')

    cy.contains('Adicionar ao carrinho').click()
    cy.contains('Cart (1)').should('exist')
  })
})
