const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors'); // Importa el módulo cors

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'mysql212.mysql.database.azure.com',
    user: 'mastero',
    password: 'Alejandrof15',
    database: 'chambitas',
    port: 3306,
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

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
});

// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let id_usuario = request.body.id_usuario;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (id_usuario && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM usuarios WHERE id_usuario = ? AND password = ?', [id_usuario, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.id_usuario = id_usuario;
				// Redirect to home page
				response.status(200).json({ message: 'Login successful' });
                console.log("Login successful");
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// http://localhost:3000/home
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.id_usuario + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000);
console.log("Listening on http://localhost:3000")
