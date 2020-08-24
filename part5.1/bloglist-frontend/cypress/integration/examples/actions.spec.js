describe('Blog app', function () {
  describe('initialize', function () {
    it('creates a user', function () {
      cy.request('POST', 'http://localhost:3007/api/testing/reset')
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      }
      cy.request('POST', 'http://localhost:3007/api/users/', user)
      cy.visit('http://localhost:3001')
    })

    it('displays login ', function () {
      cy.contains('Blog')
      cy.contains('Developed by Andrea Crego 2020')
    })
  })
})
///////////////////////////////////////////////////////////
describe('Login', function () {
  it('fails with wrong username', function () {
    cy.contains('login').click()
    cy.get('#username').type('not-mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.get('#error').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.contains('Wrong credentials')
    cy.contains('cancel').click()
  })

  it('fails with wrong password', function () {
    cy.contains('login').click()
    cy.get('#username').clear()
    cy.get('#username').type('mluukkai')
    cy.get('#password').clear()
    cy.get('#password').type('passpass')
    cy.get('#login-button').click()
    cy.contains('Wrong credentials')
    cy.contains('cancel').click()
  })

  it('succeeds with correct credentials', function () {
    cy.contains('login').click()
    cy.get('#username').clear()
    cy.get('#username').type('mluukkai')
    cy.get('#password').clear()
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.contains('User Matti Luukkainen is logged in')
    cy.contains('logout').click()
  })
})
///////////////////////////////////////////////////
describe('When logged in', function () {
  it('logs in', function () {
    cy.contains('login').click()
    cy.get('#username').clear()
    cy.get('#username').type('mluukkai')
    cy.get('#password').clear()
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('User Matti Luukkainen is logged in')
  })

  it('creates a blog', function () {
    cy.contains('Add blog').click()
    cy.get('#title').type('a blog created by cypress')
    cy.get('#author').type('Matti Luukkainen')
    cy.get('#url').type('www.fullstackopen.com')
    cy.contains('save').click()
    cy.contains('a blog created by cypress')
    cy.get('.AppBody > ul > li')
      .eq(0)
      .should('contain', 'a blog created by cypress')
  })

  it('creates a second blog', function () {
    cy.contains('Add blog').click()
    cy.get('#title').clear()
    cy.get('#title').type('another blog cypress')
    cy.get('#author').clear()
    cy.get('#author').type('Matti Luukkainen')
    cy.get('#url').clear()
    cy.get('#url').type('www.fullstackopen.com')
    cy.contains('save').click()
  })

  it('has two blogs', function () {
    cy.get('.AppBody > ul > li').should('have.length', 2)
    cy.get('.AppBody > ul > li').eq(1).should('contain', 'another blog cypress')
    cy.wait(5000)
  })

  it('can like a blog', function () {
    cy.contains('view').click()
    cy.contains('Likes: 0')
    cy.contains('like').click()
    cy.contains('Likes: 1')
  })
})
////////////////////////////////////////////
describe('Create another user', function () {
  it('creates a second user', function () {
    const user = {
      name: 'Testy McTestface',
      username: 'testy',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3007/api/users/', user)
  })
})
/////////////////////////////////////////////
describe('Login other user', function () {
  it('succeeds with correct credentials', function () {
    cy.contains('logout').click()
    cy.contains('login').click()
    cy.get('#username').type('testy')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('User Testy McTestface is logged in')
  })

  it('creates a new blog', function () {
    cy.contains('Add blog').click()
    cy.get('#title').type('a blog created by cypress added by testy')
    cy.get('#author').type('Matti Luukkainen')
    cy.get('#url').type('www.fullstackopen.com')
    cy.contains('save').click()
    cy.contains('a blog created by cypress added by testy')
    cy.get('.AppBody > ul > li').should('have.length', 3)
    cy.wait(5000)
  })

  it('can successfully delete a blog for currently authenticated user', function () {
    cy.contains('a blog created by cypress added by testy')
    cy.get(':nth-child(3) > :nth-child(2) > :nth-child(1) > button').click()
    cy.get('#delete').click()
    cy.get('.AppBody > ul > li').should('have.length', 2)
  })

  it('can *not* delete a blog added by another user', function () {
    cy.get('#view')
    cy.get(
      'ul > :nth-child(2) > :nth-child(2) > :nth-child(1) > button'
    ).click()
    cy.get('#delete').should('not.be.visible')
    cy.get('.AppBody > ul > li').should('have.length', 2)
  })
})
/////////////////////////////////////////
describe('Blogs are sorted by number of likes', function () {
  it('sorts by number of likes in descending order', function () {
    cy.get(
      ':nth-child(1) > :nth-child(2) > .togglableContent > [data-testid=author] > #likes'
    ).should('contain', 'Likes: 1')
    cy.get(':nth-child(1) > .App-link').should(
      'contain',
      'a blog created by cypress'
    )

    cy.get(
      ':nth-child(2) > :nth-child(2) > .togglableContent > [data-testid=author] > #likes'
    ).should('contain', 'Likes: 0')
    cy.get(':nth-child(2) > .App-link').should(
      'contain',
      'another blog cypress'
    )
    cy.get(
      ':nth-child(2) > :nth-child(2) > .togglableContent > [data-testid=author] > #likes > div > #add-like'
    ).click()

    cy.get(
      ':nth-child(2) > :nth-child(2) > .togglableContent > [data-testid=author] > #likes > div > #add-like'
    ).click()
    cy.wait(1000)

    cy.get(
      ':nth-child(2) > :nth-child(2) > .togglableContent > [data-testid=author] > #likes > div > #add-like'
    ).click()
    cy.wait(1000)
    cy.get(
      ':nth-child(1) > :nth-child(2) > .togglableContent > [data-testid=author] > #likes'
    ).should('contain', 'Likes: 2')
    cy.get(':nth-child(1) > .App-link').should(
      'contain',
      'another blog cypress'
    )
  })
})
