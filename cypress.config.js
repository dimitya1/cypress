const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      APP_URL: 'https://bilka.com.ua/',
      APP_URL_UK_LOCALE: 'https://bilka.com.ua/uk/',
      ITEMS_IN_COMPARISON: 3, //choose between 1 and 3
      ITEMS_IN_SHOPPING_CART: 3
    },
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
});
