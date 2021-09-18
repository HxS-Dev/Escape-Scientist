describe ('URL is correct', () => {
    it ('Go to page', () => {
        cy.visit('')
    })
    it ('Check url', () => {
        cy.url().should('include', '786')
    })
})