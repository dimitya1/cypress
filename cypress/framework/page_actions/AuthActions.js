import { AuthElements } from "../locators/AuthElements";

export class AuthActions {
    static openLoginForm() {
        cy.get(AuthElements.classButton_LoginAndRegistration).click();
    }

    static openRegistrationForm() {
        this.openLoginForm()
        cy.get(AuthElements.classButton_Registration).click();
    }

    static registerEnterFullName(fullName) {
        cy.get(AuthElements.classInput_FullName).type(fullName);
    }

    static registerGenerateEmail(startOfEmail, emailProvider) {
        const emailRandomIdentifier = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;

        return startOfEmail + emailRandomIdentifier + '@' + emailProvider;
    }

    static registerEnterEmail(email) {
        cy.get(AuthElements.classInput_Email).type(email);
    }

    static logEnteredEmail(email) {
        cy.log(`EMAIL used for registration is: ${email}`);
    }

    static registerEnterPassword(password) {
        cy.get(AuthElements.classInput_Password).type(password);
    }

    static registerCheckAgreementCheckbox() {
        cy.get(AuthElements.idCheckbox_RegistrationAgree).check({ force: true });
    }

    static submitRegistrationForm() {
        cy.get(AuthElements.classInput_RegistrationSubmit).click().wait(3000);
    }

    static assertUserNameIsShownInNavbar(userName) {
        cy.get(AuthElements.classButton_UserDetails).should('contain', userName)
    }

    static assertUserNameIsNotShownInNavbar(userName) {
        cy.get(AuthElements.classButton_LoginAndRegistration).should('not.contain', userName);
    }

    static loginEnterEmail(email) {
        cy.get(AuthElements.classInput_LoginEmail).first().type(email);
    }

    static loginEnterPassword(password) {
        cy.get(AuthElements.classInput_LoginPassword).first().type(password);
    }

    static submitLoginForm() {
        cy.contains('Увійти').click('bottom', { force: true }).wait(3000);
    }

    static assertLoginUnauthorizedError() {
        cy.get(AuthElements.classText_Errors).should('contain.text', 'Невірний логін або пароль.');
    }

    static openUserDetailsPage() {
        cy.get(AuthElements.classButton_UserDetails).click();
    }

    static clickLogoutButton() {
        cy.get(AuthElements.classInput_LogoutButton).click();
    }

    static assertHowToAuthHelpText() {
        cy.get(AuthElements.classText_HowToAuthHelp).should('contain.text', 'Для входу в особистий кабінет використовуйте');
    }

    static assertLoginRegisterButtonIsShownInNavbar() {
        cy.get(AuthElements.classButton_LoginAndRegistration).should('contain.html', 'Увійти/<br>Реєстрація');
    }
}
