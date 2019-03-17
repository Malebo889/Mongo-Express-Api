'use strict'

// Cargamos el módulo de mongoose
var mongoose = require('mongoose');

// Usaremos los esquemas
var Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos
var UserSchema = Schema({
    email: { type: String, unique: true, lowercase: true},
	name: String,
    password: String,
    signupDate: { type: Date, default: Date.now()}
});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('User', UserSchema);