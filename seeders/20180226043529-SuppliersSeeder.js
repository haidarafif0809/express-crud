'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let suppliers = [];
    for (var i = 0; i < 10; i++) {
      let name = faker.company.companyName();
      let kota = faker.address.city();
      suppliers.push({
        name: name,
        kota: kota,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('Suppliers', suppliers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Suppliers', null, {});
  }
};
