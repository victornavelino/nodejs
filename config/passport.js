const passport = require('passport');
const localStrategy = require('passport-local');

//agregamos referencia al modelo donde se va a utilizar
const Usuarios = require('../models/Usuarios');

// login con usuario y pass en base local
passport.use(
    //por defecto passport espera usuario y password
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                console.log("EMAIIIIIIIIIIILLLLLL");
                console.log(email);
                const usuario = await Usuarios.findOne({
                    where: { email: email }
                });
                //El usuario existe, péro el pass es incorrecto
                if (!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message: 'Password Incorrecto'
                    })
                }
                //el ussuario y el pass son correctos
                return done(null, usuario);
            } catch (error) {
                console.log("EMAIIIIIIIIIIILLLLLL cacht");
                //si el usuario no existe
                return done(null, false, {
                    message: 'Esa Cuenta no Existe'
                })

            }
        }
    )
);

//serializar el usuario
passport.serializeUser((usuario, callback) =>{
    callback(null, usuario);
});

//deserializar el usuario
passport.deserializeUser((usuario, callback) =>{
    callback(null, usuario);
});

//exportar
module.exports = passport;