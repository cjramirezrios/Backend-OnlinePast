const{Model,Sequelize,DataTypes}=require('sequelize');
const {PEDIDO_TABLE}=require('./pedido.model');
const{PRODUCT_TABLE}=require('./product.model');
const PEDIDO_PRODUCT_TABLE='pedidos_products';

const PedidoProductosSchema={
  id:{
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
    },
    onUpdate:'CASCADE',
    onDelete:'SET NULL'
  }
}


class PedidoProduct extends Model{
  static associate(models){

  }
  static config(sequelize){
    return {
      sequelize,
      tablename:PEDIDO_PRODUCT_TABLE,
      modelName:'PedidoProductos',
      timestamps:false
    }
  }
}


module.exports={PedidoProduct,PedidoProductosSchema,PEDIDO_PRODUCT_TABLE}