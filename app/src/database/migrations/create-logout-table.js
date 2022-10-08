module.exports = async (client) => {
    console.log('Creatingtable LOGOUT ');
    return client.query('CREATE TABLE IF NOT EXISTS logedout_tokens (id UUID PRIMARY KEY)');
}