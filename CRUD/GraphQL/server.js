const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'mysql212.mysql.database.azure.com',
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

const schema = buildSchema(`
  type Afiliado {
    id: Int
    nombre_afiliado: String
    profesion: String
  }

  type Query {
    afiliados: [Afiliado]
  }

  type Mutation {
    createAfiliado(nombre_afiliado: String): String
    updateAfiliado(id: Int, nombre_afiliado: String): String
    deleteAfiliado(id: Int): String
  }
`);

const root = {
  afiliados: (args, context) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM afiliados';
      connection.query(sql, (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  },
  createAfiliado: ({ nombre_afiliado }, context) => {
    return new Promise((resolve, reject) => {
      const afiliadoObj = {
        nombre_afiliado
      };
      const sql = 'INSERT INTO afiliados SET ?';
      connection.query(sql, afiliadoObj, error => {
        if (error) reject(error);
        resolve('Afiliado created!');
      });
    });
  },
  updateAfiliado: ({ id, nombre_afiliado }, context) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE afiliados SET nombre_afiliado = '${nombre_afiliado}' WHERE id = ${id}`;
      connection.query(sql, error => {
        if (error) reject(error);
        resolve('Afiliado updated!');
      });
    });
  },
  deleteAfiliado: ({ id }, context) => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM afiliados WHERE id = ${id}`;
      connection.query(sql, error => {
        if (error) reject(error);
        resolve('Afiliado deleted!');
      });
    });
  }
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(3000, () => {
  console.log('Server is up and running on port 3000');
});

