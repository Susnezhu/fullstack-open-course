describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test',
      username: 'test',
      password: 'secret'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('button', 'log in').click()
      cy.contains('label', 'Username').type('test')
      cy.contains('label', 'Password').type('secret')
      cy.get('#login_submit').click()
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.contains('button', 'log in').click()
      cy.contains('label', 'Username').type('wrong')
      cy.contains('label', 'Password').type('wrong')
      cy.get('#login_submit').click()
      cy.contains('Wrong password or username')
    })
  })

  describe('Blog', function() {
    beforeEach(function() {
      cy.contains('button', 'log in').click()
      cy.contains('label', 'Username').type('test')
      cy.contains('label', 'Password').type('secret')
      cy.get('#login_submit').click()
    })

    it('A blog can be created', function() {
      cy.contains('button', 'create new blog').click()
      cy.contains('label', 'Title').type('Test blog')
      cy.contains('label', 'Author').type('Test author')
      cy.contains('label', 'Url').type('link will be here')
      cy.get('#create-blog-btn').click()
      cy.contains('A new blog "Test blog" by "Test author" added')
      cy.contains('Test blog - Test author')
    })

    describe('When blog created', function() {
      beforeEach(function() {
        cy.contains('button', 'create new blog').click()
        cy.contains('label', 'Title').type('Like this blog')
        cy.contains('label', 'Author').type('Author love likes')
        cy.contains('label', 'Url').type('link will be here')
        cy.get('#create-blog-btn').click()
        cy.contains('Like this blog - Author love likes').click()
      })

      it('A blog can be liked', function() {
        cy.get('#send-like-btn').click()
        cy.contains('You liked: Like this blog')
        cy.contains('Like this blog - Author love likes').click()
        cy.contains('likes: 1')
      })

      it('A blog can be deteled', function() {
        cy.get('#remove-blog-btn').click()
        cy.contains('Blog "Like this blog" deleted successfully')
        cy.contains('Like this blog - Author love likes').should('not.exist')
      })

      it('Only blog creater can delete', function() {
        cy.get('#log-out-btn').click()
        const user = {
          name: 'Test2',
          username: 'test2',
          password: 'secret'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        
        cy.contains('button', 'log in').click()
        cy.contains('label', 'Username').type('test2')
        cy.contains('label', 'Password').type('secret')
        cy.get('#login_submit').click()
        
        cy.contains('Like this blog - Author love likes').click()
        cy.get('#remove-blog-btn').should('not.exist')
      })
    })
  })

  describe('When many blogs was created', function() {
    beforeEach(function() {
      cy.contains('button', 'log in').click()
      cy.contains('label', 'Username').type('test')
      cy.contains('label', 'Password').type('secret')
      cy.get('#login_submit').click()

      const alpabeth = 'ABCD'
      alpabeth.split('').forEach(letter => {
        cy.contains('button', 'create new blog').click()
        cy.contains('label', 'Title').type(letter)
        cy.contains('label', 'Author').type(letter)
        cy.contains('label', 'Url').type('link will be here')
        cy.get('#create-blog-btn').click()
      })
    })

    it('Blogs in right order', function() {
      const alpabeth = 'ABCD'
      alpabeth.split('').forEach(letter => {
        let likeAmound = Math.floor(Math.random() * 10) + 1;

        for (let i = 0; i < likeAmound; i++) {
          cy.contains(letter + ' - ' + letter).click()
          cy.get('#send-like-btn').click()
        }
      })
    })

  })
})