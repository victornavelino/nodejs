const Proyectos = require('../models/Proyectos');
const slug = require('slug');

exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
}
exports.formularioProyecto = (req, res) => {
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto'
    });
}
exports.nuevoProyecto = async (req, res) => {
    //Enviar a la consola lo que el usuario escribe
    //validar que tenga algo el input
    const nombre = req.body.nombre;

    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agregar un Nombre al proyecto' });
    }
    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores
        })
    } else {
        //insertamos registro en BD 
        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/');
    }
}