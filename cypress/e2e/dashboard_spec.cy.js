describe('Dashboard', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/ideas", {
      statusCode: 200,
      fixture: "ideas" // --> fixtures/ideas.json
    })

    cy.visit('http://localhost:3000')
  })

  it('displays the application title', () => {
    cy.get('h1').should('contain', 'IdeaBox')
  })

  it('displays the form ', () => {
    cy.get('form').should('exist')
    cy.get('form input[name="title"]').should('exist')
    cy.get('form input[name="description"]').should('exist')
    cy.get('form button').should('exist')
  })

  it('displays the list of ideas', () => {
    cy.get('.ideas-container').should('exist')
    cy.get('.card').should('have.length', 3)
    cy.get('.card').first().find('h3').should('have.text', 'Bluetooth rotary phone')
    cy.get('.card').first().find('p').should('have.text', 'Because it\'s cool as heck and who wants a landline these days')
    cy.get('.card').first().find('button').should('exist')
    cy.get('.card').last().find('h3').should('have.text', 'Waterproof books')
    cy.get('.card').last().find('p').should('have.text', 'For reading in a pool/ocean/bathtub')
    cy.get('.card').first().find('button').should('exist')
  })

  it('adds a new idea to the list', () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/ideas", {
      statusCode: 201,
      body: {
        title: "Remote Finder",
        description: "A button on your couch that makes your TV remote beep"
      }
    }) 

    cy.get('form input[name="title"]').type('Remote Finder')
    cy.get('form input[name="description"]').type('A button on your couch that makes your TV remote beep')
    cy.get('form button').click()
    cy.get('.card').last().find('h3').should('have.text', 'Remote Finder')
    cy.get('.card').last().find('p').should('have.text', 'A button on your couch that makes your TV remote beep')
  })

  it('deletes a new idea from the list', () => {
    cy.intercept("DELETE", "http://localhost:3001/api/v1/ideas/1", {
      statusCode: 200
    }) 

    cy.get('.card').first().find('button').click()
    cy.get('.card').should('have.length', 2)
    cy.get('.card').first().find('h3').should('have.text', 'Bring back bowing')
    cy.get('.card').first().find('p').should('have.text', 'No more shaking hands! Let\'s all bow and curtsy instead')
  })
})