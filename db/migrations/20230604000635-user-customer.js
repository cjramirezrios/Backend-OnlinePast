'use strict';
const {UserSchema,USER_TABLE}=require('../models/user.model');
const {CustomerSchema,CUSTOMER_TABLE}=require('../models/customer.model');
const {ProductSchema,PRODUCT_TABLE}=require('../models/product.model');
const {CategorySchema,CATEGORY_TABLE}=require('../models/category.model');
const {PedidoSchema,PEDIDO_TABLE}=require('../models/pedido.model');
const {PedidoProductosSchema,PEDIDO_PRODUCT_TABLE}=require('../models/pedido-productos.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE,UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE,CustomerSchema);
    await queryInterface.createTable(CATEGORY_TABLE,CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE,ProductSchema);
    await queryInterface.createTable(PEDIDO_TABLE,PedidoSchema);
    await queryInterface.createTable(PEDIDO_PRODUCT_TABLE,PedidoProductosSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable();
    await queryInterface.dropTable();
    await queryInterface.dropTable();
    await queryInterface.dropTable();
  }
};
