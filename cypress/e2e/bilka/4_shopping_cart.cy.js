import { ShoppingCartActions } from '../../framework/page_actions/ShoppingCartActions'
import { CommonActions } from '../../framework/page_actions/CommonActions'

describe('shopping cart actions', () => {
    it('can add a product to the shopping cart from all products list', () => {
        CommonActions.visitIphoneCoversPage()

        ShoppingCartActions.addProductsToTheShoppingCart(1)

        ShoppingCartActions.assertFirstProductPriceEqualsToShoppingCartPrice()

        ShoppingCartActions.assertProductsInShoppingCartCounters(1)
    });

    it('can add a product to the shopping cart from a product page', () => {
        ShoppingCartActions.visitSomeIphoneCoverPage()

        ShoppingCartActions.addProductToTheShoppingCartDirectly()

        ShoppingCartActions.assertProductPriceEqualsToShoppingCartPriceOnProductPage()

        ShoppingCartActions.assertProductsInShoppingCartCounters(1)
    });

    it('products price in shopping cart is calculated correctly', function () {
        CommonActions.visitIphoneCoversPage()

        ShoppingCartActions.addProductsToTheShoppingCartAndAssertTotalPrice(Cypress.env('ITEMS_IN_SHOPPING_CART'))
    });

    context('has some products in the shopping cart', () => {
        beforeEach(() => {
            CommonActions.visitIphoneCoversPage()

            ShoppingCartActions.addProductsToTheShoppingCart(Cypress.env('ITEMS_IN_SHOPPING_CART'))
        });

        it('can remove a product from the shopping cart', () => {
            ShoppingCartActions.clickShoppingCartButton()

            ShoppingCartActions.getProductsInShoppingCartBadgeCounter().then((counterBeforeRemoval) => {
                ShoppingCartActions.assertProductsInShoppingCartLength(parseInt(counterBeforeRemoval.text()))

                ShoppingCartActions.initRemovingFirstProductFromTheShoppingCart()
                ShoppingCartActions.assertRemovingProductConfirmationText()
                CommonActions.confirmJavascriptConfirm()

                const counterAfterRemoval = parseInt(counterBeforeRemoval.text()) - 1;
                ShoppingCartActions.assertProductsInShoppingCartBadgeCounter(counterAfterRemoval)
                ShoppingCartActions.assertProductsInShoppingCartLength(counterAfterRemoval)
            });
        });

        it('can use confirmation popup to cancel removal', () => {
            ShoppingCartActions.clickShoppingCartButton()

            ShoppingCartActions.getProductsInShoppingCartBadgeCounter().then((counterBeforeRemoval) => {
                counterBeforeRemoval = parseInt(counterBeforeRemoval.text());

                ShoppingCartActions.assertProductsInShoppingCartLength(counterBeforeRemoval)

                ShoppingCartActions.initRemovingFirstProductFromTheShoppingCart()
                CommonActions.declineJavascriptConfirm()

                ShoppingCartActions.assertProductsInShoppingCartBadgeCounter(counterBeforeRemoval)
                ShoppingCartActions.assertProductsInShoppingCartLength(counterBeforeRemoval)
            });
        });
    });
});
