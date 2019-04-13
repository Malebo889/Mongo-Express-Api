'use strict'

// Cargamos el módulo de express para poder crear rutas y configuracion de passport
var express = require('express');

// Cargamos el controlador
var userCtrl = require('../controllers/user');
var bookCtrl = require('../controllers/book');
var passportCtrl = require('../config/passport');
var auth = require('../middlewares/auth')

// Llamamos al router
var api = express.Router();

// Creamos una ruta para los métodos que tenemos en nuestros controladores
api.get('/user', userCtrl.getUsers)
api.get('/userid/:userId', userCtrl.getUser)
api.get('/user/true', userCtrl.getUsersTrue)
api.get('/user/false', userCtrl.getUsersFalse)
api.get('/user/logout', passportCtrl.authenticated, userCtrl.logout)
api.get('/user/info', passportCtrl.authenticated, userCtrl.userInfo)
api.post('/user', userCtrl.signUp)
api.post('/user/login', userCtrl.signIn)
api.put('/userid/:userId', userCtrl.updateUser)
api.put('user', userCtrl.logicDeleteUser)
api.delete('/user/:userId', userCtrl.deleteUser)
api.get('/user/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes Acceso' })
})

api.get('/book', bookCtrl.getBooks)
api.get('/book/:bookId', bookCtrl.getBook)
api.get('/bookByGenre/:genre', bookCtrl.getBookGenre)
api.get('/book/:name', bookCtrl.getBookName)
api.get('/book/:price', bookCtrl.getBookPrice)
api.post('/book/', bookCtrl.saveBook)
api.put('/book/:bookId', bookCtrl.updateBook)
api.delete('/book/:bookId', bookCtrl.deleteBook)

// Exportamos la configuración
module.exports = api;