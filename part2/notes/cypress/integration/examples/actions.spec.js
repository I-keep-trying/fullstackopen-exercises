describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3010/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3010/api/users/', user)
    cy.visit('http://localhost:3002')
  })

  it('can open front page', function () {
    cy.contains('Notes')
    cy.contains('Developed by Andrea Crego 2020')
  })

  it('can log in as a user', function () {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('User Matti Luukkainen is logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('creates a new note', function () {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('new note').click()
        cy.get('input').type('another note cypress')
        cy.contains('save').click()
      })

      it('can be made important', function () {
        cy.contains('another note cypress').contains('make important').click()

        cy.contains('another note cypress').contains('make not important')
      })
    })
  })
})
