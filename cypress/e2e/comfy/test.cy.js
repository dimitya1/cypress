describe('comfy', () => {
    it('test', () => {
        cy.visit('https://comfy.ua')

        cy.get('.header-bottom-compare').click()
    })
})
