import { AuthActions } from '../../framework/page_actions/AuthActions'
import { CommonActions } from '../../framework/page_actions/CommonActions'

describe('authentication and authorization process', () => {
    context('registration', () => {
        beforeEach(function () {
            cy.fixture('secret').then((secret) => {
                this.registrationData = secret.registration;
            });

            CommonActions.visitWebsiteUkLocale()
        });

        it('can register with valid data', function () {
            AuthActions.openRegistrationForm()

            AuthActions.registerEnterFullName(this.registrationData.valid.fullName);
            //generating a unique email
            const emailToRegister = AuthActions.registerGenerateEmail(this.registrationData.valid.email, this.registrationData.tempEmailProvider)
            AuthActions.registerEnterEmail(emailToRegister);
            AuthActions.logEnteredEmail(emailToRegister)
            AuthActions.registerEnterPassword(this.registrationData.valid.password)
            AuthActions.registerCheckAgreementCheckbox()

            AuthActions.submitRegistrationForm()

            AuthActions.assertUserNameIsShownInNavbar(this.registrationData.valid.fullName);
        });

        it('can not register with invalid data', function () {
            AuthActions.openRegistrationForm()

            AuthActions.registerEnterFullName(this.registrationData.invalid.fullName);
            AuthActions.registerEnterEmail(this.registrationData.invalid.email);
            AuthActions.registerEnterPassword(this.registrationData.invalid.password)
            AuthActions.registerCheckAgreementCheckbox()

            AuthActions.submitRegistrationForm()

            AuthActions.assertUserNameIsNotShownInNavbar(this.registrationData.invalid.fullName);
        });
    });

    context('login', () => {
        beforeEach(function () {
            cy.fixture('secret').then((secret) => {
                this.loginData = secret.login;
            });

            CommonActions.visitWebsiteUkLocale()
        });

        it('can login with correct credentials', function () {
            AuthActions.openLoginForm()

            AuthActions.loginEnterEmail(this.loginData.valid.email)
            AuthActions.loginEnterPassword(this.loginData.valid.password)

            AuthActions.submitLoginForm()

            AuthActions.assertUserNameIsShownInNavbar( this.loginData.valid.fullName)
        });

        it('can not login with incorrect credentials', function () {
            AuthActions.openLoginForm()

            AuthActions.loginEnterEmail(this.loginData.invalid.email)
            AuthActions.loginEnterPassword(this.loginData.invalid.password)

            AuthActions.submitLoginForm()

            AuthActions.assertLoginUnauthorizedError()
        });
    });

    context('logout', () => {
        beforeEach(function () {
            CommonActions.visitWebsiteUkLocale()

            cy.fixture('secret').then((secret) => {
                //we need to be logged in first
                CommonActions.login(secret.login.valid.email, secret.login.valid.password)
            });
        });

        it('can logout successfully', () => {
            AuthActions.openUserDetailsPage()

            AuthActions.clickLogoutButton()

            AuthActions.assertHowToAuthHelpText()
            AuthActions.assertLoginRegisterButtonIsShownInNavbar()
        });
    });
});