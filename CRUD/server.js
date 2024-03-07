require('dotenv').config();
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');

const jwtSecret = process.env.JWT_SECRET;
const accountSid = process.env.TWILLIO_ACC_SID;
const authToken = process.env.TWILLIO_ACC_TOKEN;

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

//Ruta para actualizar las contraseñas no hasheadas en la base de datos
app.get('/hash-passwords', async function(request, response) {
    try {
        // Identificar contraseñas no hasheadas
        const usersWithPlainPasswords = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM usuarios WHERE password NOT LIKE "$2b$%"', function(error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        // Para cada usuario con contraseña no hasheada, actualizar la contraseña hasheada
        for (const user of usersWithPlainPasswords) {
            const plainPassword = user.password; // Contraseña sin hashear
            const saltRounds = Number(process.env.SALT_ROUNDS);
            const hashedPassword = await bcrypt.hash(plainPassword, saltRounds); // Generar hash bcrypt
            // Actualizar la contraseña hasheada en la base de datos
            await new Promise((resolve, reject) => {
                connection.query('UPDATE usuarios SET password = ? WHERE id_usuario = ?', [hashedPassword, user.id_usuario], function(error, results, fields) {
                    if (error) {
                        reject(error);
                    } else {
                        console.log(`Contraseña actualizada para el usuario con id ${user.id_usuario}`);
                        resolve();
                    }
                });
            });
        }

        response.status(200).json({ message: 'Contraseñas actualizadas correctamente.' });
    } catch (error) {
        console.error('Error al actualizar las contraseñas:', error);
        response.status(500).json({ message: 'Error al actualizar las contraseñas.' });
    }
});

app.post('/auth', function(request, response) {
    // Capture the input fields
    let id_usuario = request.body.id_usuario;
    let password = request.body.password;
    // Ensure the input fields exist and are not empty
    if (id_usuario && password) {
        // Execute SQL query that'll select the account from the database based on the specified username
        connection.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario], async function(error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Get the stored hashed password
                const hashedPassword = results[0].password;
                // Compare the hashed password with the provided password
                const match = await bcrypt.compare(password, hashedPassword);
                if (match) {
                    // Passwords match, generate JWT token
                    const token = jwt.sign({ id_usuario }, jwtSecret, { expiresIn: '1h' }); // Expira en 1 hora
                    // Respond with token
                    response.status(200).json({ message: 'Login successful', token });
                    console.log("Login successful");
                } else {
                    // Passwords don't match
                    response.status(401).json({ message: 'Incorrect Username and/or Password!' });
                }
            } else {
                // Account not found
                response.status(401).json({ message: 'Incorrect Username and/or Password!' });
            }
            response.end();
        });
    } else {
        // Username or password not provided
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

app.post('/registro_usuario', async (req, res) => {
    const { nombre, img, id_usuario, direccion, telefono, password } = req.body;

    // Verifica si todos los campos requeridos están presentes
    if (!nombre || !img || !id_usuario || !direccion || !telefono || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    // Verifica que los campos cumplan con ciertas restricciones (opcional)
    if (nombre.length > 255 || img.length > 255 || id_usuario.length > 255 || direccion.length > 255 || telefono.length > 255 || password.length > 255) {
        return res.status(400).json({ message: 'Los campos exceden la longitud máxima permitida (255 caracteres).' });
    }

    try {
        // Verificar si ya existe un usuario con el mismo id_usuario
        const existingUser = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario], function(error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });

        if (existingUser) {
            // Si ya existe un usuario con el mismo id_usuario, devolver un mensaje indicando que el usuario ya está registrado
            return res.status(409).json({ message: 'Ya existe un usuario con el mismo ID de usuario.' });
        }

        const saltRounds = Number(process.env.SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, saltRounds); // 10 es el número de saltRounds
        const usuario = {
            nombre: nombre,
            img: img,
            id_usuario: id_usuario,
            direccion: direccion,
            telefono: telefono,
            password: hashedPassword
        };

        const sql = 'INSERT INTO usuarios SET ?';
        connection.query(sql, usuario, error => {
            if (error) {
                console.error('Error al registrar el usuario:', error);
                res.status(500).json({ message: 'Error al registrar el usuario.' });
            } else {
                res.status(201).json({ message: 'Usuario creado exitosamente.' });
            }
        });
    } catch (error) {
        console.error('Error al encriptar la contraseña:', error);
        res.status(500).json({ message: 'Error al encriptar la contraseña.' });
    }
});

app.post('/sms', (req, res) => {
    const id_usuario = req.body.id_usuario;
    const password = req.body.password;
    const telefono = req.body.telefono;
    const from = '+19286156449';
    const to = `+52${telefono}`;

    const body = `Datos de Acceso Chambitas\n\nid_usuario: ${id_usuario}\npassword: ${password}`;
    
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    
    const data = new URLSearchParams();
        data.append('Body', body);
        data.append('From', from);
        data.append('To', to);
    
    axios.post(url, data, {
        auth: {
            username: accountSid,
            password: authToken
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        res.status(200).send(response.data);
    })
    .catch(error => {
        res.status(500).send(error);
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