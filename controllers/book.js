'use strict'

const Book = require('../models/book')

function getBook (req, res) {
	let bookId = req.params.bookId

	Book.findById(bookId, (err, book) => {
		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
		if(!book) return res.status(404).send({message: 'El libro no existe'})
	
		res.status(200).send({ book })
	})
}

function getBooks (req, res) {
	Book.find({}, (err, books) => {
		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
		if (!books) return res.status(404).send({message: 'No existen libros'})
	
		res.status(200).send({books})
	})
}

function getBookGenre (req, res) {
	let bookGenre = req.params.genre

	Book.find(bookGenre, (err, books) => {
		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
		if (!books) return res.status(404).send({message: 'No existen libros'})
	
		res.status(200).send(books)
	})
}

function saveBook (req, res) {
	console.log('POST /api/book')
	console.log(req.body)

	let book = new Book()
	book.name = req.body.name
	book.price = req.body.price
	book.genre = req.body.genre
	book.description = req.body.description

	book.save((err, bookStored) => {
		if(err) res.status(500).send({message: `Error al salvar la base de datos ${err}`})
		else res.status(200).send({book: bookStored})
	})
}

function updateBook (req, res) {
	let bookId = req.params.bookId
	let update = req.body

	Book.findByIdAndUpdate(bookId, update, (err, bookUpdated) => {
		if(err) res.status(500).send({message: `Error al actualizar el libro: ${err}`})

		res.status(200).send({ book: bookUpdated})
	})
}

function deleteBook (req, res) {
	let bookId = req.params.bookId

	Book.findById(bookId, (err, book) => {
		if(err) res.status(500).send({message: `Error al borrar el libro: ${err}`})
		
		book.remove(err => {
			if(err) res.status(500).send({message: `Error al borrar el libro: ${err}`})
			res.status(200).send({message: 'El libro ha sido eliminado'})
		})
	})
}

module.exports = {
	getBook,
	getBooks,
	getBookGenre,
	saveBook,
	updateBook,
	deleteBook,
}