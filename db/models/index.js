const {Category,CategorySchema}=require('./category.model');
const {Product,ProductSchema}=require('./product.model');
const{User,UserSchema}=require('./user.model');
const{Customer,CustomerSchema}=require('./customer.model');
const{Pedido,PedidoSchema}=require('./pedido.model');
const {PedidoProduct,PedidoProductosSchema}=require('./pedido-productos.model')

function setupModels(sequelize){
    User.init(UserSchema,User.config(sequelize));
    Customer.init(CustomerSchema,Customer.config(sequelize));
    Category.init(CategorySchema,Category.config(sequelize));
    Product.init(ProductSchema,Product.config(sequelize));
    Pedido.init(PedidoSchema,Pedido.config(sequelize));
    PedidoProduct.init(PedidoProductosSchema,PedidoProduct.config(sequelize));

    
    User.associate(sequelize.models);
    Customer.associate(sequelize.models);
    Category.associate(sequelize.models);
    Product.associate(sequelize.models);
    Pedido.associate(sequelize.models);
}

module.exports=setupModels;