const {config}=require('../config');
module.exports={
  development:{
    url:config.URI,
    dialect:'postgres'
  },
  production:{
    url:config.URI,
    dialect:'postgres'
  }
}
