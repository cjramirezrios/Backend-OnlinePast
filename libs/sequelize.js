const { Sequelize } = require("sequelize");
const setupModels=require('../db/models/index');
const {config}=require('../config');
const URI=config.URI;
const sequelize=new Sequelize(URI,{
  dialect:'postgres',
  logging:false
});
setupModels(sequelize);
sequelize.sync();
module.exports=sequelize;
