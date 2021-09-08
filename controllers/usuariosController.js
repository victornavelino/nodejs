const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req,res) => {
    res.render('crearCuenta',{
        nombrePagina : 'Crear Cuenta en UpTask'
    })
}
exports.crearCuenta = (req,res) => {
    //leer los datoss    
    //console.log(req.body);
    const {email,password} =req.body;
    //crear usuario
    Usuarios.create({
        email,
        password
    })
    .then(()=>{
        res.redirect('/iniciar-sesion')
    })
}