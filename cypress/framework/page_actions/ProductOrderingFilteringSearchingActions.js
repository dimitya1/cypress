import { ProductOrderingFilteringSearchingElements } from "../locators/ProductOrderingFilteringSearchingElements";
import { CommonElements } from "../locators/CommonElements";

export class ProductOrderingFilteringSearchingActions {
    static showAllItems() {
        cy.get('body').then(($body) => {
            if (!$body.find(ProductOrderingFilteringSearchingElements.classItem_Pagination).length) {
                return;
            }

            const pagination = $body.find(ProductOrderingFilteringSearchingElements.classItem_Pagination);
            const latestA = pagination.find(ProductOrderingFilteringSearchingElements.idButton_LatestUrlInPagination).last();
            const hrefAttributeOfLatestA = latestA.attr('href');
            const regex = /page=(\d+)/;
            const match = hrefAttributeOfLatestA.match(regex);
            const numOfPages = match ? match[1] : 0;

            for (let i = 0; i < (numOfPages - 1); i++) {
                cy.get(ProductOrderingFilteringSearchingElements.classButton_LoadMoreItems).click().wait(3000);
            }
        })
    }

    static getRating(element) {
        const stars = element.children(ProductOrderingFilteringSearchingElements.classItem_RatingStar)
        const activeStars = stars.filter((index, element) => {
            return element.classList.contains('svg-star--active')
        }).length
        const halfStars = stars.filter((index, element) => {
            return element.classList.contains('svg-star--half')
        }).length

        return this.calculateRatingByStars(activeStars, halfStars);
    }

    static calculateRatingByStars(activeStarsCount, halfStarsCount) {
        return parseFloat(activeStarsCount + (halfStarsCount === 1 ? 0.5 : 0))
    }

    static clickProductOrderingSelect() {
        cy.get(ProductOrderingFilteringSearchingElements.classSelect_Ordering).click()
    }

    static clickProductOrderingByPriceAsc() {
        cy.get(ProductOrderingFilteringSearchingElements.idOption_OrderingByPriceAsc).click()
    }

    static clickProductOrderingByPriceDesc() {
        cy.get(ProductOrderingFilteringSearchingElements.idOption_OrderingByPriceDesc).click()
    }

    static clickProductOrderingByRatingAsc() {
        cy.get(ProductOrderingFilteringSearchingElements.idOption_OrderingByRatingAsc).click()
    }

    static clickProductOrderingByRatingDesc() {
        cy.get(ProductOrderingFilteringSearchingElements.idOption_OrderingByRatingDesc).click()
    }

    static sortProductsByPriceAsc() {
        this.clickProductOrderingSelect()
        this.clickProductOrderingByPriceAsc()
    }

    static sortProductsByRatingAsc() {
        this.sortProductsByRatingDesc()

        this.clickProductOrderingSelect()
        this.clickProductOrderingByRatingAsc()
    }

    static sortProductsByPriceDesc() {
        this.sortProductsByPriceAsc()

        this.clickProductOrderingSelect()
        this.clickProductOrderingByPriceDesc()
    }

    static sortProductsByRatingDesc() {
        this.clickProductOrderingSelect()
        this.clickProductOrderingByRatingDesc()
    }

    static assertProductsAreSortedAsc() {
        cy.get(ProductOrderingFilteringSearchingElements.idIcon_OrderingAsc).should('be.visible')
    }

    static assertProductsAreSortedDesc() {
        cy.get(ProductOrderingFilteringSearchingElements.idIcon_OrderingDesc).should('be.visible')
    }

    static iterateAscendingSortedProductsAndAssertPrice() {
        cy.get(CommonElements.classText_ProductPrice).each(($item, index, $list) => {
            if (index === 0
                || $item.parent().children('button').prop('disabled')
                || $list.eq(index - 1).parent().children('button').prop('disabled')
            ) {
                return;
            }

            const greaterPrice = $item
                .parent()
                .children(ProductOrderingFilteringSearchingElements.idMeta_ProductPrice)
                .attr('content')

            const lowerPrice = $list.eq(index - 1)
                .parent()
                .children(ProductOrderingFilteringSearchingElements.idMeta_ProductPrice)
                .attr('content')

            expect(parseInt(lowerPrice)).to.be.lte(parseInt(greaterPrice))
        })
    }

    static iterateDescendingSortedProductsAndAssertPrice() {
        cy.get(CommonElements.classText_ProductPrice).each(($item, index, $list) => {
            if (index === 0
                || $item.parent().children('button').prop('disabled')
                || $list.eq(index - 1).parent().children('button').prop('disabled')
            ) {
                return;
            }

            const lowerPrice = $item
                .parent()
                .children(ProductOrderingFilteringSearchingElements.idMeta_ProductPrice)
                .attr('content')

            const greaterPrice = $list.eq(index - 1)
                .parent()
                .children(ProductOrderingFilteringSearchingElements.idMeta_ProductPrice)
                .attr('content')

            expect(parseInt(lowerPrice)).to.be.lte(parseInt(greaterPrice))
        })
    }

    static iterateAscendingSortedProductsAndAssertRating() {
        cy.get(ProductOrderingFilteringSearchingElements.classItem_RatingContainer).each(($item, index, $list) => {
            if (index === 0
                || $item.parent().children(ProductOrderingFilteringSearchingElements.classItem_ProductPriceContainer).children('button').prop('disabled')
                || $list.eq(index - 1).parent().children(ProductOrderingFilteringSearchingElements.classItem_ProductPriceContainer).children('button').prop('disabled')
            ) {
                return;
            }

            const rating = ProductOrderingFilteringSearchingActions.getRating($item)
            const ratingPrev = ProductOrderingFilteringSearchingActions.getRating($list.eq(index - 1))

            expect(ratingPrev).to.be.lte(rating)
        })
    }

    static iterateDescendingSortedProductsAndAssertRating() {
        cy.get(ProductOrderingFilteringSearchingElements.classItem_RatingContainer).each(($item, index, $list) => {
            if (index === 0
                || $item.parent().children(ProductOrderingFilteringSearchingElements.classItem_ProductPriceContainer).children('button').prop('disabled')
                || $list.eq(index - 1).parent().children(ProductOrderingFilteringSearchingElements.classItem_ProductPriceContainer).children('button').prop('disabled')
            ) {
                return;
            }

            const rating = ProductOrderingFilteringSearchingActions.getRating($item)
            const ratingPrev = ProductOrderingFilteringSearchingActions.getRating($list.eq(index - 1))

            expect(ratingPrev).to.be.gte(rating)
        })
    }

    static searchForProduct(search) {
        cy.get(ProductOrderingFilteringSearchingElements.classInput_ProductSearch).type(search)

        cy.get(ProductOrderingFilteringSearchingElements.classButton_ProductSearch).click()
    }

    static assertProductSearchContainsSearchedText(search) {
        cy.get(ProductOrderingFilteringSearchingElements.classInput_ProductSearch).should('have.value', search);
    }

    static assertProductSearchTitleContainsSearchedText(search) {
        cy.get(ProductOrderingFilteringSearchingElements.classText_ProductSearchTitle).should('contain.text', search);
    }

    static assertFirstProductTitleContainsSearchedText(search) {
        cy.get(ProductOrderingFilteringSearchingElements.classText_ProductTitle).first().should('contain.text', search)
    }

    static checkGivenFilters(filters) {
        Object.keys(filters).forEach(key => {
            filters[key].forEach(value => {
                cy.contains(value).parent('li').children('input').check({ force: true })
            });
        });
    }

    static applyFilters() {
        cy.get(ProductOrderingFilteringSearchingElements.classButton_ApplyFilters).click()
    }

    static getProducts() {
        return cy.get(ProductOrderingFilteringSearchingElements.classItem_Product)
    }

    static visitProductPageByProduct(jqueryProduct) {
        cy.visit(Cypress.env('APP_URL') + jqueryProduct.find('a').last().attr('href'))
    }

    static assertCompatibilityWithPhoneModels(phoneModels) {
        cy.contains('Сумісність').parent().children('p').last().invoke('text').then(text => {
            cy.assertContainsOneOf(text, phoneModels)
        });
    }

    static assertProducer(producers) {
        cy.contains('Виробник аксесуара').parent().children('p').last().invoke('text').should('be.oneOf', producers)
    }

    static assertPhoneCoverType(coverTypes) {
        cy.contains('Варіант чохла').parent().children('p').last().invoke('text').should('be.oneOf', coverTypes)
    }

    static assertColor(colors) {
        cy.get(ProductOrderingFilteringSearchingElements.classItem_ProductColors).invoke('html').then(html => {
            cy.assertContainsOneOf(html, colors)
        })
    }
}
