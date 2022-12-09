/* eslint-disable no-undef */
describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen"
    }
    cy.request("POST", "http://localhost:3003/api/users/", user)
    cy.visit("http://localhost:3000")
  })

  it("front page can be opened", function() {
    cy.contains("Blogs")
    cy.contains("Login to application")
  })

  describe("Login",function() {
    it("succeeds with correct credentials", function() {
      cy.get("#username").type("mluukkai")
      cy.get("#password").type("salainen")
      cy.get("#login-btn").click()
      cy.contains("Successfully Logged In")
      cy.contains("Matti Luukkainen mluukkai logged in")
      cy.get("#logout-btn").click()
      cy.contains("Successfully Logged Out")
    })

    it("fails with wrong credentials", function() {
      cy.get("#username").type("root")
      cy.get("#password").type("salainen")
      cy.get("#login-btn").click()
      cy.get(".error")
        .should("contain", "Invalid Credentials")
        .and("have.css", "color", "rgb(245, 0, 0)")
        .and("have.css", "border-style", "solid")
      cy.contains("Matti Luukkainen mluukkai logged in").should("not.exist")
    })
  })

  describe("When logged in", function() {
    beforeEach(function() {
      cy.login({ username: "mluukkai", password: "salainen" })
    })

    it("A blog can be created", function() {
      cy.contains("add blog").click()
      cy.get("#title").type("Jeffery")
      cy.get("#author").type("Dahmer")
      cy.get("#url").type("https://en.wikipedia.org/wiki/Jeffrey_Dahmer")
      cy.contains("create").click()
      cy.contains("A new blog Jeffery by Dahmer added")
      cy.contains("Jeffery - Dahmer")
    })

    describe("and a blog exists", function() {
      beforeEach(function () {
        cy.createBlog({
          title: "Cypress creating a new blog",
          author: "Cypress",
          url: "https://www.cypress.io/"
        })
      })

      it("A user can like a blog", function() {
        cy.contains("view").click()
        cy.get("[data-cy=\"likes\"]").should("contain", 0)
        cy.contains("like").click()
        cy.get("[data-cy=\"likes\"]").should("contain", 1)
      })

      it("A user who created the blog can delete it", function () {
        cy.contains("view").click()
        cy.contains("Cypress creating a new blog")
        cy.contains("delete").click()
        cy.contains("Blog Removed")
        cy.contains("Cypress creating a new blog").should("not.exist")
      })

      it("A user who didn't create the blog cannot delete it", function () {
        const user = {
          name: "User admin",
          username: "root",
          password: "admin"
        }
        cy.request("POST", "http://localhost:3003/api/users/", user)
        cy.get("#logout-btn").click()
        cy.login({ username: "root", password: "admin" })
        cy.contains("view").click()
        cy.contains("Cypress creating a new blog")
        cy.contains("delete").should("not.exist")
      })
    })

    describe("and multiple blogs exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "first blog",
          author: "Cypress",
          url: "https://www.cypress.io/",
          likes: 1,
        })
        cy.createBlog({
          title: "second blog",
          author: "Cypress",
          url: "https://www.cypress.io/",
          likes: 2,
        })
        cy.createBlog({
          title: "third blog",
          author: "Cypress",
          url: "https://www.cypress.io/",
          likes: 3,
        })
      })

      it("Blogs are ordered based on number of likes in descending order", function () {

        cy.get(".blog").eq(0).should("contain", "third blog")
        cy.get(".blog").eq(1).should("contain", "second blog")
        cy.get(".blog").eq(2).should("contain", "first blog")

      })
    })
  })
})
