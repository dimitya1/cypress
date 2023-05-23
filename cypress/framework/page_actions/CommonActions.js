import { AuthActions } from './AuthActions';

export class CommonActions {
    static visitWebsiteUkLocale() {
        cy.visit(Cypress.env('APP_URL_UK_LOCALE'));
    }

    static visitIphoneCoversPage() {
        cy.visit(Cypress.env('APP_URL_UK_LOCALE') + 'category/chehly-dlya-iphone/');
    }

    static visitIphoneBatteriesPage() {
        cy.visit(Cypress.env('APP_URL_UK_LOCALE') + 'category/kupit-akkumulyator-iphone/')
    }

    static login(email, password) {
        AuthActions.openLoginForm()

        AuthActions.loginEnterEmail(email)
        AuthActions.loginEnterPassword(password)

        AuthActions.submitLoginForm()
    }

    static confirmJavascriptConfirm() {
        cy.on('window:confirm', () => true);
    }

    static declineJavascriptConfirm() {
        cy.on('window:confirm', () => false);
    }
}
