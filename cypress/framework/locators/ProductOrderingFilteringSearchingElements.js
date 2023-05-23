export class ProductOrderingFilteringSearchingElements {
    static classItem_Pagination = '.s-paging-list';
    static idButton_LatestUrlInPagination = 'a[href]:not(:contains("→"))';
    static classButton_LoadMoreItems = '.main-container__more.jsMoreItems';
    static classItem_RatingContainer = '.main-container__item-for-rating';
    static classItem_RatingStar = '.main-container__item-for-rating-svg';
    static classSelect_Ordering = '.select';
    static idOption_OrderingByPriceAsc = 'a[href="?sort=price&order=asc"]';
    static idOption_OrderingByPriceDesc = 'a[href="?sort=price&order=desc"]';
    static idOption_OrderingByRatingAsc = 'a[href="?sort=rating&order=asc"]';
    static idOption_OrderingByRatingDesc = 'a[href="?sort=rating&order=desc"]';
    static idIcon_OrderingAsc = 'i[class="sort-asc"]';
    static idIcon_OrderingDesc = 'i[class="sort-desc"]';
    static classItem_ProductPriceContainer = '.main-container__item-for-price';
    static idMeta_ProductPrice = 'meta[itemprop="price"]';
    static classInput_ProductSearch = '.searchpro__field-input.js-searchpro__field-input';
    static classButton_ProductSearch = '.searchpro__field-button.js-searchpro__field-button';
    static classText_ProductSearchTitle = '.main-container__top-title';
    static classText_ProductTitle = '.main-container__item-text';
    static classButton_ApplyFilters = '.sidebar__filter-top-button.sidebar__filter-top-button--ok';
    static classItem_Product = '.main-container__item.jsItem';
    static classItem_ProductColors = '.page-card__container-center-colors';
}
