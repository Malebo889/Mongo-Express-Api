'use strict'

// Cargamos el módulo de express para poder crear rutas
var express = require('express');

// Cargamos el controlador
var userCtrl = require('../controllers/user');
var bookCtrl = require('../controllers/book');

// Llamamos al router
var api = express.Router();

// Creamos una ruta para los métodos que tenemos en nuestros controladores
api.get('/user', userCtrl.getUsers)
api.get('/user/:userId', userCtrl.getUser)
api.post('/user', userCtrl.saveUser)
api.put('/user/:userId', userCtrl.updateUser)
api.delete('/user/:userId', userCtrl.deleteUser)

api.get('/book', bookCtrl.getBooks)
api.get('/book/:bookId', bookCtrl.getBook)
api.get('/bookByGenre', bookCtrl.getBookGenre)
api.post('/book/', bookCtrl.saveBook)
api.put('/book/:bookId', bookCtrl.updateBook)
api.delete('/book/:bookId', bookCtrl.deleteBook)

// Exportamos la configuración
module.exports = api;