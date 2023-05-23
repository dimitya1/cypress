import { ProductComparisonActions } from '../../framework/page_actions/ProductComparisonActions'
import { CommonActions } from "../../framework/page_actions/CommonActions";

describe('product comparison actions', () => {
    it('can add an item to comparison', () => {
        CommonActions.visitIphoneCoversPage()

        ProductComparisonActions.assertCompareButtonVisibilityAndAddToComparison()
        ProductComparisonActions.assertProductsInComparisonCounter(1)

        ProductComparisonActions.goToComparisonPage()

        ProductComparisonActions.assertProductsInComparisonLength(1)
    });

    it('can not have more than 3 items compared at one time', () => {
        CommonActions.visitIphoneCoversPage()

        ProductComparisonActions.addItemsToComparison(4)

        ProductComparisonActions.assertProductsInComparisonCounter(4)

        ProductComparisonActions.goToComparisonPage()

        ProductComparisonActions.assertProductsInComparisonLength(3)
    });

    context('with an item in comparison list', () => {
        beforeEach(() => {
            CommonActions.visitIphoneCoversPage()

            ProductComparisonActions.addItemsToComparison(Cypress.env('ITEMS_IN_COMPARISON'))
        });

        it('can remove an item from comparison', () => {
            ProductComparisonActions.visitComparisonPage()

            ProductComparisonActions.removeFirstProductFromComparison()

            ProductComparisonActions.assertProductsInComparisonLength(Cypress.env('ITEMS_IN_COMPARISON') - 1)
        });

        it('can remove all items straightaway', () => {
            ProductComparisonActions.visitComparisonPage()

            ProductComparisonActions.removeAllProductsFromComparisonStraightaway()

            ProductComparisonActions.assertThereAreNoProductsInComparison()
            ProductComparisonActions.assertNoProductsInComparisonText()
        });
    });
});
