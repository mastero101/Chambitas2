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

app.get('/ordenes', (req, res) => {
    const sql = 'SELECT * FROM ordenes';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No results');
        }
    });
});

app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuarios';

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

app.post('/registro_usuario', (req, res) => {
    const { nombre, img, id_usuario, direccion, telefono } = req.body;
  
    // Verifica si todos los campos requeridos están presentes
    if (!nombre || !img || !id_usuario || !direccion || !telefono) {
      return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }
  
    // Verifica que los campos cumplan con ciertas restricciones (opcional)
    if (nombre.length > 255 || img.length > 255 || id_usuario.length > 255 || direccion.length > 255 || telefono.length > 255) {
      return res.status(400).json({ message: 'Los campos exceden la longitud máxima permitida (255 caracteres).' });
    }
  
    const usuario = {
      nombre: nombre,
      img: img,
      id_usuario: id_usuario,
      direccion: direccion,
      telefono: telefono
    };
  
    const sql = 'INSERT INTO usuarios SET ?';
    connection.query(sql, usuario, error => {
      if (error) {
        console.error('Error al registrar el afiliado:', error);
        res.status(500).json({ message: 'Error al registrar el afiliado.' });
      } else {
        res.status(201).json({ message: 'Afiliado creado exitosamente.' });
      }
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