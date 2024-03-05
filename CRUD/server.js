require('dotenv').config();
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: false // Habilita la conexión sin verificar el certificado SSL
    }
});

const app = express();

app.use(cors()); // Agrega el middleware cors para habilitar CORS
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// Rutas de autenticación y acceso a la página de inicio

app.get('/', function(request, response) {
    // Render login template
    response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response) {
    // Capture the input fields
    let id_usuario = request.body.id_usuario;
    let password = request.body.password;
    // Ensure the input fields exist and are not empty
    if (id_usuario && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query('SELECT * FROM usuarios WHERE id_usuario = ? AND password = ?', [id_usuario, password], function(error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Generate JWT token
                const token = jwt.sign({ id_usuario }, jwtSecret, { expiresIn: '1h' }); // Se expira en 1 hora, puedes ajustar esto según tus necesidades
                // Respond with token
                response.status(200).json({ message: 'Login successful', token });
                console.log("Login successful");
            } else {
                response.status(401).json({ message: 'Incorrect Username and/or Password!' });
            }
            response.end();
        });
    } else {
        response.status(400).json({ message: 'Please enter Username and Password!' });
        response.end();
    }
});

app.get('/home', function(request, response) {
    // If the user is logged in
    if (request.session.loggedin) {
        // Output username
        response.send('Welcome back, ' + request.session.id_usuario + '!');
    } else {
        // Not logged in
        response.send('Please login to view this page!');
    }
    response.end();
});

// CRUD

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
    const sql = 'SELECT id,nombre,id_usuario, telefono, direccion, img FROM usuarios';

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
    const { nombre, img, id_usuario, direccion, telefono, password } = req.body;
  
    // Verifica si todos los campos requeridos están presentes
    if (!nombre || !img || !id_usuario || !direccion || !telefono || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }
  
    // Verifica que los campos cumplan con ciertas restricciones (opcional)
    if (nombre.length > 255 || img.length > 255 || id_usuario.length > 255 || direccion.length > 255 || telefono.length > 255 || password.length > 255) {
      return res.status(400).json({ message: 'Los campos exceden la longitud máxima permitida (255 caracteres).' });
    }
  
    const usuario = {
      nombre: nombre,
      img: img,
      id_usuario: id_usuario,
      direccion: direccion,
      telefono: telefono,
      password: password
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

app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
});