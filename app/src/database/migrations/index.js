require('dotenv').config()
const { Pool } = require('pg')

const createUsersTable = require('./create-users-table');
const createCoursesTable = require('./create-courses-table')
const populateCourses = require('./populate-courses');
const createLogoutTable = require('./create-logout-table');

const migrations = [createUsersTable, createCoursesTable, populateCourses, createLogoutTable];

console.log('ENVS', process.env);

const runMigrations = async () => {
    const client = new Pool()
    await client.connect()
    for (let i = 0; i < migrations.length; i++) {
        const migration = migrations[i];
        await migration(client);
    }
}

runMigrations().then(() => {
    process.exit(0);
}).catch(e => {
    console.error(e);
    process.exit(1);
});
