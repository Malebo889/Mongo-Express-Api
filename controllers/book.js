'use strict'

const Book = require('../models/book')

function getBook(req, res) {
	let bookId = req.params.bookId

	if (!bookGenre) return res.status(500).send({ message: 'Es necesario introducir un Identificador.' })

	Book.findById(bookId, (err, book) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
		if (!book) return res.status(404).send({ message: 'El libro no existe' })

		res.status(200).send({ book })
	})
}

function getBooks(req, res) {
	Book.find({}, (err, books) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
		if (!books) return res.status(404).send({ message: 'No existen libros' })

		res.status(200).send({ books })
	})
}

function getBookGenre(req, res) {
	let bookGenre = req.params.genre

	if (!bookGenre) return res.status(500).send({ message: 'Es necesario introducir un Genero.' })

	Book.find({ 'genre': bookGenre }, (err, books) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
		if (!books) return res.status(404).send({ message: 'No existen libros' })

		res.status(200).send(books)
	})
}

function getBookName(req, res) {
	let bookName = req.params.name

	if (!bookName) return res.status(500).send({ message: 'Es necesario introducir un Nombre.' })

	Book.find({ 'name': bookName }, (err, books) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
		if (!books) return res.status(404).send({ message: 'No existen libros' })

		res.status(200).send(books)
	})
}

function getBookPrice(req, res) {
	let bookPrice = req.params.price

	if (!bookPrice) return res.status(500).send({ message: 'Es necesario introducir un Precio.' })

	Book.find({ 'price': bookPrice }, (err, books) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
		if (!books) return res.status(404).send({ message: 'No existen libros' })

		res.status(200).send(books)
	})
}

function saveBook(req, res) {
	console.log('POST /api/book')
	console.log(req.body)

	let book = new Book()
	book.name = req.body.name
	book.price = req.body.price
	book.genre = req.body.genre
	book.description = req.body.description

	book.save((err, bookStored) => {
		if (err) res.status(500).send({ message: `Error al salvar la base de datos ${err}` })
		else res.status(200).send({ book: bookStored })
	})
}

function updateBook(req, res) {
	let bookId = req.params.bookId
	let update = req.body

	Book.findByIdAndUpdate(bookId, update, (err, bookUpdated) => {
		if (err) res.status(500).send({ message: `Error al actualizar el libro: ${err}` })

		res.status(200).send({ book: bookUpdated })
	})
}

function deleteBook(req, res) {
	let bookId = req.params.bookId

	Book.findById(bookId, (err, book) => {
		if (err) res.status(500).send({ message: `Error al borrar el libro: ${err}` })

		book.remove(err => {
			if (err) res.status(500).send({ message: `Error al borrar el libro: ${err}` })
			res.status(200).send({ message: 'El libro ha sido eliminado' })
		})
	})
}

module.exports = {
	getBook,
	getBooks,
	getBookGenre,
	getBookName,
	getBookPrice,
	saveBook,
	updateBook,
	deleteBook,
}