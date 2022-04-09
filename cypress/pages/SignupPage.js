//ex: class PascalCase{
//    camelCase()
//}

class SignupPage {

    acessPage() {
        cy.visit('/')
        cy.get('a[href="/deliver"]').click()
        //chekpoint
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas') //verificação se esta na pagina
    }

    fillForm(deliver) {
        //Preenchimento dados pessoais
        cy.get('input[name="fullName"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        //Preenchimento dados de endereço
        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()
        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)

        //Valida dados de endereço
        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

        //Escolhe metodo de entrega e faz upload CNH
        cy.contains('.delivery-method li', deliver.delivery_method).click()
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh)
    }

    submit() {
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage) {
        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage)
    }

    alertMessageShouldBe(expectedMessage){
        //cy.get('form .alert-error').should('have.text', expectedMessage)
        cy.contains('form .alert-error', expectedMessage).should('be.visible')
    }
}

export default new SignupPage;