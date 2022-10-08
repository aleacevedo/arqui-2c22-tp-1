module.exports = async (client) => {
    console.log('Populating COURSES ');
    await client.query('INSERT INTO courses (id, name) VALUES ($1, $2) ON CONFLICT ON CONSTRAINT courses_pkey DO NOTHING', [6103, 'Analisis Matematico 2']);
    await client.query('INSERT INTO courses (id, name) VALUES ($1, $2) ON CONFLICT ON CONSTRAINT courses_pkey DO NOTHING', [6106, 'Probabilidad y Estadistica 1']);
    await client.query('INSERT INTO courses (id, name) VALUES ($1, $2) ON CONFLICT ON CONSTRAINT courses_pkey DO NOTHING;', [6107, 'Matematica Discreta']);
    await client.query('INSERT INTO courses (id, name) VALUES ($1, $2) ON CONFLICT ON CONSTRAINT courses_pkey DO NOTHING;', [6108, 'Algebra 2']);
    await client.query('INSERT INTO courses (id, name) VALUES ($1, $2) ON CONFLICT ON CONSTRAINT courses_pkey DO NOTHING;', [6110, 'Analisis Matematico 3']);
    return;
}
