'use strict'

const User = require('../models/user')
const passport = require('passport')


function userLogin(req, res, next) {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			next(err);
		}
		if (!user) {
			return res.status(400).send('Email o Password no validos.');
		}
		req.logIn(user, (err) => {
			if (err) {
				next(err);
			}
			res.send('Login Correcto.');
		})
	})(req, res, next);
}

function getUser(req, res) {
	let userId = req.params.userId

	User.findById(userId, (err, user) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
		if (!user) return res.status(404).send({ message: 'El usuario no existe' })
		if (isActive = true)
		res.status(200).send({ user })
	})
}

function getUsers(req, res) {
	User.find({ isActive: true }, (err, users) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
		if (!users) return res.status(404).send({ message: 'No existen usuarios' })

		res.status(200).send({ users })
	})
}

function saveUser(req, res, next) {
	console.log('POST /api/user')
	console.log(req.body)

	const newUser = new User()
		newUser.email = req.body.email,
		newUser.name = req.body.name,
		newUser.password = req.body.password


	User.findOne({ email: req.body.email }, (err, existingUser) => {
		if (existingUser) {
			return res.status(400).send('Este email ya esta registrado');
		}
		newUser.save((err) => {
			if (err) {
				next(err);
			}
			req.logIn(newUser, (err) => {
				if (err) {
					next(err);
				}
				res.send('Usuario guardado exitosamente.')
			})
		})
	})
}

function updateUser(req, res) {
	let userId = req.params.userId
	let update = req.body

	User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
		if (err) res.status(500).send({ message: `Error al actualizar el usuario: ${err}` })

		res.status(200).send({ user: userUpdated })
	})
}

function logicDeleteUser(req, res) {
	let userId = req.params.userId

	User.findByIdAndUpdate(userId, logicDelete, (err, userUpdated) => {
		if (err) res.status(500).send({ message: `Error al borrar el usuario: ${err}` })

		res.status(200).send({ user: userUpdated })
		logicDelete = false;
	})
}

function deleteUser(req, res) {
	let userId = req.params.userId

	User.findById(userId, (err, user) => {
		if (err) res.status(500).send({ message: `Error al borrar el usuario: ${err}` })

		user.remove(err => {
			if (err) res.status(500).send({ message: `Error al borrar el usuario: ${err}` })
			res.status(200).send({ message: 'El usuario ha sido eliminado' })
		})
	})
}

function logout(req, res) {
	req.logout();
	res.send('Logout Correcto.');
}

function userInfo(req, res) {
	res.json(req.user);
}

module.exports = {
	userLogin,
	userInfo,
	getUser,
	getUsers,
	saveUser,
	updateUser,
	logicDeleteUser,
	deleteUser,
	logout,
}