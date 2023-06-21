'use strict';
const {UserSchema,USER_TABLE}=require('../models/user.model');
const {CustomerSchema,CUSTOMER_TABLE}=require('../models/customer.model');
const {ProductSchema,PRODUCT_TABLE}=require('../models/product.model');
const {CategorySchema,CATEGORY_TABLE}=require('../models/category.model');
const {PedidoSchema,PEDIDO_TABLE}=require('../models/pedido.model');
const {PedidoProductosSchema,PEDIDO_PRODUCT_TABLE}=require('../models/pedido-productos.model');
/** @type {import('sequelize-cli').Migration} */
const {DataTypes}=require('sequelize');
module.exports = {
   up: async(queryInterface, Sequelize) =>{
    await queryInterface.createTable(USER_TABLE,{ id:{
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
      type:DataTypes.INTEGER
    },
    email:{
      allowNull:false,
      type:DataTypes.STRING,
      unique:true
    },
    password:{
      allowNull:false,
      type:DataTypes.STRING
    },
    role:{
      allowNull:false,
      type:DataTypes.STRING,
      defaultValue:'customer'
    },
    createAt:{
      allowNull:false,
      type:DataTypes.DATE,
      field:'create_at',
      defaultValue:Sequelize.NOW
    }});
    await queryInterface.createTable(CUSTOMER_TABLE,{id:{
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
      type:DataTypes.INTEGER
    },
    name:{
      allowNull:false,
      type:DataTypes.STRING
    },
    lastName:{
      allowNull:false,
      type:DataTypes.STRING,
      field:'last_name'
    },
    address:{
      allowNull:false,
      type:DataTypes.STRING,
    }
    ,
    phone:{
      allowNull:false,
      type:DataTypes.STRING
    },
    createdAt:{
      allowNull:false,
      type:DataTypes.DATE,
      field:'created_at',
      defaultValue:Sequelize.NOW
    },
    userId:{
      field:'user_id',
      allowNull:false,
      type:DataTypes.INTEGER,
      unique:true,
      references:{
        model:USER_TABLE,
        key:'id'
      },
      onUpdate:'CASCADE',
      onDelete:'SET NULL'
    }});
    await queryInterface.createTable(CATEGORY_TABLE,{id:{
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
      type:DataTypes.INTEGER
    },
    name:{
      type:DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    description:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    image:{
      type:DataTypes.STRING,
      allowNull:false
    },
    createdAt:{
      allowNull:false,
      type:DataTypes.DATE,
      field:'created_at',
      defaultValue:Sequelize.NOW
    }});
    await queryInterface.createTable(PRODUCT_TABLE,{id:{
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
      type:DataTypes.INTEGER
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    image:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    description:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    price:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    stock:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    createdAt:{
      allowNull:false,
      type:DataTypes.DATE,
      field:'created_at',
      defaultValue:Sequelize.NOW
    },
    categoryId:{
      field:'category_id',
      allowNull:false,
      type:DataTypes.INTEGER,
      references:{
        model:CATEGORY_TABLE,
        key:'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    }});
    await queryInterface.createTable(PEDIDO_TABLE,{id:{
      allowNull:false,
      primaryKey:true,
      type:DataTypes.STRING
    },
    customerId:{
      field:'customer_id',
      allowNull:false,
      type:DataTypes.INTEGER,
      references:{
        model:CUSTOMER_TABLE,
        key:'id'
      },
      onUpdate:'CASCADE',
      onDelete:'SET NULL'
    },
    createdAt:{
      allowNull:false,
      type:DataTypes.DATE,
      field:'created_at',
      defaultValue:Sequelize.NOW
    },
    total:{
      type:DataTypes.INTEGER,
    }});
    
    await queryInterface.createTable(PEDIDO_PRODUCT_TABLE,{id:{
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
      type:DataTypes.INTEGER
    },
    createAt:{
      allowNull:false,
      type:DataTypes.DATE,
      field:'create_at',
      defaultValue:Sequelize.NOW
    },
    amount:{
      allowNull:false,
      type:DataTypes.INTEGER
    },
    pedidoId:{
      field:'pedido_id',
      allowNull:false,
      type:DataTypes.STRING,
      references:{
        model:PEDIDO_TABLE,
        key:'id'
      },
      onUpdate:'CASCADE',
      onDelete:'SET NULL'
    },
    productId:{
      field:'product_id',
      allowNull:false,
      type:DataTypes.INTEGER,
      references:{
        model:PRODUCT_TABLE,
        key:'id'
      }
    }});
  },

  down: async(queryInterface, Sequelize)=> {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(PEDIDO_TABLE);
    await queryInterface.dropTable(PEDIDO_PRODUCT_TABLE);
  }
};
