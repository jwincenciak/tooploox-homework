import { times } from 'lodash'

describe('Adding and removing elements', () => {

    // I'm using variables since I've wanted my test to be able to add/remove any desired number of elements. The base values are set up to 2 as expected in homework assignment
    const x = 2 //Number of elements to add
    const y = 2 //Number of elements to remove
    const z = x - y

    it('Adds elements', () => {
        // I've added this since the page itself throws a few xhr errors that are not test-related and I don't want them to be logged and spam the test results
        cy.server({
            ignore: (xhr) => {
                return xhr.method === 'GET'
            }
        })
        cy.visit('http://the-internet.herokuapp.com/add_remove_elements/')
        cy.contains('Add Element').as('addBtn')
        times(x, () => cy.get('@addBtn').click())
        cy.get('.added-manually').should('have.length', x)
    })

    it('Removes elements', () => {
        cy.get('.added-manually').as('rmvBtn')
            if (z >= 0) {
                times(y, () => cy.get('@rmvBtn').first().click())
                cy.get('@rmvBtn').should('have.length', z)
            } else {
                cy.get('@rmvBtn').click({multiple : true})
                cy.get('@rmvBtn').should('have.length', 0)
            }
    })
})