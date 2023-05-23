import { ProductOrderingFilteringSearchingActions } from '../../framework/page_actions/ProductOrderingFilteringSearchingActions'
import { CommonActions } from "../../framework/page_actions/CommonActions";

describe('product ordering, searching and filtering actions', () => {
    context('ordering', () => {
        beforeEach(() => {
            CommonActions.visitIphoneCoversPage()
        })

        it('can sort ascending by price', () => {
            ProductOrderingFilteringSearchingActions.sortProductsByPriceAsc()

            ProductOrderingFilteringSearchingActions.assertProductsAreSortedAsc()

            ProductOrderingFilteringSearchingActions.showAllItems();

            ProductOrderingFilteringSearchingActions.iterateAscendingSortedProductsAndAssertPrice()
        })

        it('can sort descending by price', () => {
            ProductOrderingFilteringSearchingActions.sortProductsByPriceDesc()

            ProductOrderingFilteringSearchingActions.assertProductsAreSortedDesc()

            ProductOrderingFilteringSearchingActions.showAllItems();

            ProductOrderingFilteringSearchingActions.iterateDescendingSortedProductsAndAssertPrice()
        })

        it('can sort ascending by rating', () => {
            ProductOrderingFilteringSearchingActions.sortProductsByRatingAsc()

            ProductOrderingFilteringSearchingActions.assertProductsAreSortedAsc()

            ProductOrderingFilteringSearchingActions.showAllItems();

            ProductOrderingFilteringSearchingActions.iterateAscendingSortedProductsAndAssertRating()
        })

        it('can sort descending by rating', () => {
            ProductOrderingFilteringSearchingActions.sortProductsByRatingDesc()

            ProductOrderingFilteringSearchingActions.assertProductsAreSortedDesc()

            ProductOrderingFilteringSearchingActions.showAllItems();

            ProductOrderingFilteringSearchingActions.iterateDescendingSortedProductsAndAssertRating()
        })
    })

    context('searching', () => {
        beforeEach(() => {
            CommonActions.visitWebsiteUkLocale()
        })

        it('can search by phone model', () => {
            const search = 's10';

            ProductOrderingFilteringSearchingActions.searchForProduct(search)

            ProductOrderingFilteringSearchingActions.assertProductSearchContainsSearchedText(search)
            ProductOrderingFilteringSearchingActions.assertProductSearchTitleContainsSearchedText(search)
            ProductOrderingFilteringSearchingActions.assertFirstProductTitleContainsSearchedText(search.toUpperCase())
        })

        it('can search by phone producer', () => {
            const search = 'Xiaomi';

            ProductOrderingFilteringSearchingActions.searchForProduct(search)

            ProductOrderingFilteringSearchingActions.assertProductSearchTitleContainsSearchedText(search)
        })
    })

    context('filtering', () => {
        it('can filter phone covers by model, color and type', () => {
            const phoneCoversFilters = {
                type: [
                    'Бампер (накладка)',
                    'Книжка',
                ],
                phone_model: [
                    'iPhone XR',
                    'iPhone 12',
                    'iPhone 11 Pro Max',
                ],
                color: [
                    'Чорний',
                    'Червоний',
                ]
            };


            CommonActions.visitIphoneCoversPage()

            ProductOrderingFilteringSearchingActions.checkGivenFilters(phoneCoversFilters)
            ProductOrderingFilteringSearchingActions.applyFilters()

            ProductOrderingFilteringSearchingActions.getProducts().each(($item) => {
                ProductOrderingFilteringSearchingActions.visitProductPageByProduct($item)

                ProductOrderingFilteringSearchingActions.assertPhoneCoverType(phoneCoversFilters.type)
                ProductOrderingFilteringSearchingActions.assertCompatibilityWithPhoneModels(phoneCoversFilters.phone_model)
                ProductOrderingFilteringSearchingActions.assertColor(phoneCoversFilters.color)
            })
        })

        it('can filter batteries by model and producer', () => {
            const phoneBatteriesFilters = {
                phone_model: [
                    'iPhone XR',
                    'iPhone XS',
                    'iPhone 11 Pro',
                ],
                producers: [
                    'Gelius',
                    'Apple (Епл)',
                ]
            };

            CommonActions.visitIphoneBatteriesPage()

            ProductOrderingFilteringSearchingActions.checkGivenFilters(phoneBatteriesFilters)
            ProductOrderingFilteringSearchingActions.applyFilters()

            ProductOrderingFilteringSearchingActions.getProducts().each(($item) => {
                ProductOrderingFilteringSearchingActions.visitProductPageByProduct($item)

                cy.log('WTF' + phoneBatteriesFilters['producers'].join(' '))
                ProductOrderingFilteringSearchingActions.assertProducer(phoneBatteriesFilters.producers)
                ProductOrderingFilteringSearchingActions.assertCompatibilityWithPhoneModels(phoneBatteriesFilters.phone_model)
            })
        })
    })
})