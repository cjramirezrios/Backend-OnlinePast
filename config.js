require('dotenv').config();

module.exports.config={
  port:process.env.PORT_DB || '',
  URI:process.env.URI
}