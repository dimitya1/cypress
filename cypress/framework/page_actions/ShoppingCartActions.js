import { ShoppingCartElements } from "../locators/ShoppingCartElements";
import { CommonElements } from "../locators/CommonElements";

export class ShoppingCartActions {
    static addProductsToTheShoppingCart(numOfProducts) {
        for (let i = 0; i < numOfProducts; i++) {
            cy.get(ShoppingCartElements.classButton_AddToCart)
                .eq(i)
                .click()
                .wait(3000);
        }
    }

    static assertFirstProductPriceEqualsToShoppingCartPrice() {
        cy.scrollTo('top').wait(10000).get(CommonElements.classText_ProductPrice)
            .first()
            .then((itemPrice) => {
                cy.get(ShoppingCartElements.classText_ShoppingCartTotalPrice).should('have.text', itemPrice.text());
            });
    }

    static assertProductsInShoppingCartCounter(count) {
        cy.scrollTo('top').wait(10000).get(ShoppingCartElements.classText_ShoppingCartCounter).last().should('have.text', count);
    }

    static assertProductsInShoppingCartBadgeCounter(count) {
        this.getProductsInShoppingCartBadgeCounter().should('have.text', count);
    }

    static assertProductsInShoppingCartCounters(count) {
        this.assertProductsInShoppingCartCounter(count)
        this.assertProductsInShoppingCartBadgeCounter(count)
    }

    static visitSomeIphoneCoverPage() {
        cy.visit(Cypress.env('APP_URL_UK_LOCALE') + 'product/chekhol-nakladka-dlya-iphone-7-plus--8-plus-baseus-tkanevyy/');
    }

    static addProductToTheShoppingCartDirectly() {
        cy.get(ShoppingCartElements.classButton_AddProductToCartDirectly)
            .click()
            .wait(3000);
    }

    static assertProductPriceEqualsToShoppingCartPriceOnProductPage() {
        cy.get(ShoppingCartElements.classText_ProductPriceDirectly).then((itemPrice) => {
            cy.get(ShoppingCartElements.classText_ShoppingCartTotalPrice).then((totalPrice) => {
                expect(parseInt(totalPrice.text().match(/\d+/)[0])).to.equal(parseInt(itemPrice.text()));
            });
        });
    }

    static addProductsToTheShoppingCartAndAssertTotalPrice(numOfProducts) {
        let totalPrice = 0;
        for (let i = 0; i < numOfProducts; i++) {
            cy.get(ShoppingCartElements.classButton_AddToCart)
                .eq(i)
                .click()
                .wait(1000)
                .then(() => {
                    cy.get(CommonElements.classText_ProductPrice)
                        .eq(i)
                        .then((itemPrice) => {
                            totalPrice += parseInt(itemPrice.text().match(/\d+/)[0]);
                        });
                })
                .then(() => {
                    if (i === numOfProducts - 1) {
                        this.clickShoppingCartButton()

                        cy.get(ShoppingCartElements.classText_ShoppingCartTotalPrice).should(
                            'have.text',
                            totalPrice + ' грн.'
                        );
                        cy.get(ShoppingCartElements.classText_ShoppingCartTotalPriceDirectly)
                            .last()
                            .should('have.text', totalPrice + ' грн.');
                        cy.get(ShoppingCartElements.classText_ShoppingCartTotalPriceOrangeDirectly).should(
                            'have.text',
                            totalPrice + ' грн.'
                        );
                    }
                });
        }
    }

    static clickShoppingCartButton() {
        cy.get(ShoppingCartElements.classButton_ShoppingCart).click();
    }

    static assertProductsInShoppingCartLength(count) {
        cy.get(ShoppingCartElements.classItem_ProductInShoppingCart).should('have.length', count);
    }

    static initRemovingFirstProductFromTheShoppingCart() {
        cy.get(ShoppingCartElements.classButton_RemoveFromShoppingCart).first().click();
    }

    static assertRemovingProductConfirmationText() {
        cy.on('window:confirm', (confirmationText) => {
            expect(confirmationText).to.equal('Ви впевнені, що хочете видалити товар з кошика?');
        });
    }

    static getProductsInShoppingCartBadgeCounter() {
        return cy.scrollTo('top').wait(10000).get(ShoppingCartElements.classText_ShoppingCartBadgeCounter);
    }
}
