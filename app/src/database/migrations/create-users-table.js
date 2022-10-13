const bcrypt = require('bcrypt');

module.exports = async (client) => {
    console.log('Creatingtable USERS ');
    const cryptedPassword = await bcrypt.hash('artillery_test', 10);
    console.log('CRYPTED PASS', cryptedPassword);
    await client.query('CREATE TABLE IF NOT EXISTS users (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, username VARCHAR(255) not null UNIQUE, password VARCHAR(255) not null);');
    await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['artillery_test+0@testing.com', cryptedPassword]);
    await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['artillery_test+1@testing.com', cryptedPassword]);
    await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['artillery_test+2@testing.com', cryptedPassword]);
    await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['artillery_test+3@testing.com', cryptedPassword]);
    await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['artillery_test+4@testing.com', cryptedPassword]);
    await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['artillery_test+5@testing.com', cryptedPassword]);
}
