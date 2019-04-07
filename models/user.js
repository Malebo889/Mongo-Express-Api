'use strict'

// Cargamos el módulo de mongoose y bcript
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Usaremos los esquemas
var Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos
var userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true, require: true },
    name: { type: String, require: true },
    password: { type: String, require: true }
}, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            next(err);
        }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) {
                next(err);
            }
            user.password = hash;
            next();
        })
    })
});

userSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, equals) => {
        if (err) {
            return cb(err);
        }
        cb(null, equals);
    })
}

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('User', userSchema);