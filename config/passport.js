var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var user = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    user.findById(id, (err, user) => {
        done(err, user);
    })
})

passport.use(new localStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
        user.findOne({ email }, (err, user) => {
            if (!user) {
                return done(null, false, { message: `Este email: ${email} no esta registrado` })
            }
            else {
                user.comparePassword(password, (err, equals) => {
                    if (equals) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, { message: 'la contraseña no es valida' });
                    }
                })
            }
        })
    }
))

exports.authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send('Tienes que estar logueado para acceder.');
}