const { Pool } = require('pg')

// clients will also use environment variables
// for connection information
const client = new Pool()
client.connect()

module.exports = client