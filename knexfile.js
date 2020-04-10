require('dotenv').config()

module.exports = {

  development: {
    client: 'postgresql',
    connection: process.env.CONN_STRING 
  },

};
