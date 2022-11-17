describe("Search Quote in the Home Page", () => {
  it("Search for a quote returns correct quote", () => {
    cy.visit("http://localhost:3000");
    cy.get("#tagsToSearchBy").contains("Author");

    cy.get("#tagsToSearchBy").contains("Title");

    cy.get("#tagsToSearchBy").contains("Keyword");

    cy.get("#tagsToSearchBy").select("Keyword");

    cy.get("input").type("tree");
    cy.contains("submit").click();
    cy.get("ul").contains("I Am VerticalBut I would rather be horizontal.");
  });

  it("Search for a quote returns 40 quotes", () => {
    cy.visit("http://localhost:3000");

    cy.get("#tagsToSearchBy").select("Keyword");

    cy.get("input").type("love");
    cy.contains("Submit").click();
    cy.get("ul").contains("I'm selfish");

    cy.get("ul").find("li").should("have.length", 40);
  });
});
