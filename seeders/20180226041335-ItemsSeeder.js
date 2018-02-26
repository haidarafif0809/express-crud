'use strict';

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let items = [];
    for (var i = 0; i < 10; i++) {
      let name = faker.commerce.productName();
      let brand = faker.company.companyName();
      let codeitem = faker.random.number();
      codeitem = String(codeitem).substr(0,3);
      codeitem = `HP${codeitem}`;
      items.push({
        name: name,
        brand: brand,
        codeitem: codeitem,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('Items', items, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items', null, {});
  }
};
