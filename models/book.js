'use strict'

// Cargamos el módulo de mongoose
var mongoose = require('mongoose')

// Usaremos los esquemas
var Schema = mongoose.Schema

// Creamos el objeto del esquema y sus atributos
var BookSchema = Schema({
	name: String,
	price: { type: Number, default: 0 },
	genre: { type: String, enum: ['Lírica', 'Narrativa', 'Drama', 'Novela', 'Temas_Editoriales']},
	description: String
})

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Book', BookSchema);