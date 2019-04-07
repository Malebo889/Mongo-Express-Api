// Utilizar funcionalidades del Ecmascript 6
'use strict'

// Cargamos los módulos
var express = require('express');
var session = require('express-session');
var MongoStore = require ('connect-mongo')(session);
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');

// Llamamos a express para poder crear el servidor
var app = express();

// Importamos las rutas
var api_routes = require('./routes');

//un metodo que se ejecuta antes que llegue a un controlador
//Configuramos bodyParser para que convierta el body de nuestras peticiones a JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'ESTO ES SECRETO',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: 'mongodb://localhost:27017/Shop',
        autoReconnect: true
    })
}))
app.use(passport.initialize());
app.use(passport.session());

// Metodo de control de acceso CORS
app.use(cors())

// Cargamos las rutas
app.use('/api', api_routes);

// exportamos este módulo para poder usar la variable app fuera de este archivo
module.exports = app;