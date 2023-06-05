require('dotenv').config();

module.exports.config={
  port:process.env.PORT_DB || '',
  URI:process.env.URI,
  MERCADOPAGO_TOKEN_API:process.env.MERCADOPAGO_TOKEN
}