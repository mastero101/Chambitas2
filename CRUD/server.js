const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'mysql212.mysql.database.azure.com', // No incluyas el puerto en el host
    user: 'mastero',
    password: 'Alejandrof15',
    database: 'chambitas',
    port: 3306,
    ssl: true
});

connection.connect(error => {
    if (error) throw error;
    console.log('Database server running!');
});

app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
});

app.get('/afiliados', (req, res) => {
    const sql = 'SELECT * FROM afiliados';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No results');
        }
    });
});

app.get('/valoraciones', (req, res) => {
    const sql = 'SELECT * FROM valoraciones';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No results');
        }
    });
});

app.get('/apikey', (req, res) => {
    const sql = 'SELECT * FROM apikey';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No results');
        }
    });
});

app.post('/add', (req, res) => {
    const sql = 'INSERT INTO afiliados SET ?';

    const afiliadoObj = {
        nombre_afiliado: req.body.nombre,
    };

    connection.query(sql, afiliadoObj, error => {
        if (error) throw error;
        res.send('Afiliado created!');
    });
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const sql = `UPDATE afiliados SET nombre_afiliado = '${nombre}' WHERE id =${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Afiliado updated!');
    });
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM afiliados WHERE id = ${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Afiliado deleted!');
    });
});