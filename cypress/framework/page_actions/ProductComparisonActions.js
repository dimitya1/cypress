import { ProductComparisonElements } from "../locators/ProductComparisonElements";
import { CommonElements } from "../locators/CommonElements";

export class ProductComparisonActions {
    static assertCompareButtonVisibilityAndAddToComparison() {
        cy.get(CommonElements.classItem_Product)
            .eq(0)
            .get(ProductComparisonElements.classButton_Compare)
            .last()
            .should('not.be.visible')
            .get(ProductComparisonElements.classButton_Compare)
            .first()
            .realHover()
            .click({ force: true });
    }

    static assertProductsInComparisonCounter(productsCount) {
        cy.get(ProductComparisonElements.classText_InComparisonCounter).should('contain.text', productsCount);
    }

    static goToComparisonPage() {
        cy.get(ProductComparisonElements.classButton_Comparison).click();
    }

    static assertProductsInComparisonLength(productsCount) {
        cy.get(ProductComparisonElements.classItem_ProductInComparison).should('have.length', productsCount);
    }

    static addItemsToComparison(itemsToCompare) {
        for (let i = 0; i < itemsToCompare; i++) {
            cy.get(ProductComparisonElements.classButton_Compare).eq(i).click({ force: true });
        }
    }

    static visitComparisonPage() {
        cy.visit(Cypress.env('APP_URL_UK_LOCALE') + 'compare/');
    }

    static removeFirstProductFromComparison() {
        cy.get(ProductComparisonElements.classItem_ProductInComparison)
            .first()
            .find(ProductComparisonElements.classButton_RemoveProductFromComparison)
            .click();
    }

    static removeAllProductsFromComparisonStraightaway() {
        cy.get(ProductComparisonElements.classButton_RemoveProductsFromComparisonStraightaway).click();
    }

    static assertThereAreNoProductsInComparison() {
        cy.get(ProductComparisonElements.classItem_ProductInComparison).should('not.exist');
    }

    static assertNoProductsInComparisonText() {
        cy.contains('Список товарів для порівняння порожній.').should('exist');
    }
}
