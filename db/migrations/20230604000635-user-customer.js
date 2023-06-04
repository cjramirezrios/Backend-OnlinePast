'use strict';
const {UserSchema,USER_TABLE}=require('../models/user.model');
const {CustomerSchema,CUSTOMER_TABLE}=require('../models/customer.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE,UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE,CustomerSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
