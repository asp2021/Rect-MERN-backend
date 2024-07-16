const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

// console.log( process.env );

// crear el servidor de express
const app = express();

// base de datos
dbConnection();

// CORS 
app.use(cors());

// lectura y parseo del body
app.use( express.json() );

// directorio publico
app.use( express.static('public') );

// rutas
// app.get('/', (req, res) => {
//     res.json({
//         ok: true
//     })
// })

//TODO: auth // crear, login, renew
app.use('/api/auth', require('./routes/auth') );
//TODO: CRUD: eventos
app.use('/api/events', require('./routes/events') );

// escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log( `servidor corriendo en puerto ${process.env.PORT}`);
})