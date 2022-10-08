module.exports = async (client) => {
    console.log('Creatingtable COURSES ');
    await client.query('CREATE TABLE IF NOT EXISTS courses (id INTEGER PRIMARY KEY, name VARCHAR(255) not null UNIQUE);');
    await client.query('CREATE TABLE IF NOT EXISTS users_courses (id uuid DEFAULT gen_random_uuid() PRIMARY KEY, user_id UUID, course_id INTEGER);');
    return
}
