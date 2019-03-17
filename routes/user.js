'use strict'

// Cargamos el módulo de express para poder crear rutas
var express = require('express');

// Cargamos el controlador
var userCtrl = require('../controllers/user');

// Llamamos al router
var api = express.Router();

// Creamos una ruta para los métodos que tenemos en nuestros controladores
api.get('/user', userCtrl.getUsers)
api.get('/user/:userId', userCtrl.getUser)
api.post('/user', userCtrl.saveUser)
api.put('/user/:userId', userCtrl.updateUser)
api.delete('/user/:userId', userCtrl.deleteUser)

// Exportamos la configuración
module.exports = api;