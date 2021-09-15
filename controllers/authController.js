const passport = require('passport');

exports.autenticarUsuario = passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

// funcion para revisar si el usuario esta logeado
exports.usuarioAutenticado = (req, res, next) =>{

//si el usuario esta autenticado, adelante
if (req.isAuthenticated()){
    return next();
}
// si no esta autenticado redirigimos al login
 return res.redirect('/iniciar-sesion');
}