import signupPage from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'

describe('Cadastro', () => {

    // beforeEach(function () {
    //     cy.fixture('deliver').then((massa) => {
    //        this.deliver = massa //this, variavel de contexto
    //   })
    // })

    //CASOS DE TESTES
    it('Usuário deve se tornar um entregador', function () {
        var deliver = signupFactory.deliver()
        signupPage.acessPage()
        signupPage.fillForm(deliver)
        signupPage.submit()
        //Valida recebimento dos dados
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signupPage.modalContentShouldBe(expectedMessage)
    })

    it('CPF incorreto', function () {
        var deliver = signupFactory.deliver()
        deliver.cpf = 'xx099887723'
        signupPage.acessPage()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! CPF inválido')
        //cy.screenshot()
    })

    it('Email incorreto', function () {
        var deliver = signupFactory.deliver()
        deliver.email = 'email.email.com'
        signupPage.acessPage()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! Email com formato inválido.')

    })

    context('Campos obrigatorios', function () {
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'CPF', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'CEP', output: 'É necessário informar o CEP' },
            { field: 'postalcode', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function(){
            signupPage.acessPage()
            signupPage.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signupPage.alertMessageShouldBe(msg.output)
            })
        })
    })
})