const { Pool } = require('pg')

// clients will also use environment variables
// for connection information
const client = new Pool()
client.connect()
client.query('CREATE TABLE IF NOT EXISTS users (id uuid DEFAULT gen_random_uuid() PRIMARY KEY, username VARCHAR(255) not null UNIQUE, password VARCHAR(255) not null);');

module.exports = client