const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear Cuenta en UpTask'
    })
}

exports.formIniciarSesion= (req, res) => {
    const {error} =res.locals.mensajes;
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar Sesion en UpTask',
        error: error
    })
}


exports.crearCuenta = async (req, res) => {
    //leer los datoss    
    //console.log(req.body);
    const { email, password } = req.body;

    try {
        //crear usuario
        await Usuarios.create({
            email,
            password
        });
        res.redirect('/iniciar-sesion')
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina: 'Crear Cuenta en UpTask',
            email: email,
            password: password
        })

    }

}