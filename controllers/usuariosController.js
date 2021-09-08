const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear Cuenta en UpTask'
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
        res.render('crearCuenta', {
            errores: error.errors,
            nombrePagina: 'Crear Cuenta en UpTask'

        })

    }

}