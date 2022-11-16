describe('My First Test', () => {
  it('Search for a quote returns correct quote', () => {
    cy.visit('http://localhost:3000')
    cy.get("header").should("contain", "Home")

    // cy.get("#tagsToSearchBy").contains("Title")

    // cy.get("#tagsToSearchBy").contains("Keyword")

    // cy.get("#tagsToSearchBy").select("Keyword")


    // cy.get("input").type("tree")
    // cy.contains("submit").click()
    // cy.get("ul").contains("I Am VerticalBut I would rather be horizontal.")
  })
})
