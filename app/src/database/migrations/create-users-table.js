module.exports = async (client) => {
    console.log('Creatingtable USERS ');
    return client.query('CREATE TABLE IF NOT EXISTS users (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, username VARCHAR(255) not null UNIQUE, password VARCHAR(255) not null);');
}