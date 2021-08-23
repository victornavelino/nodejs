const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');
const slug = require('slug');

exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
}
exports.formularioProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    });
}
exports.nuevoProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();
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
            errores,
            proyectos
        })
    } else {
        //insertamos registro en BD 
        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/');
    }
}

exports.proyectoPorUrl = async (req, res, next) => {
    const proyectosPromesa = Proyectos.findAll();
    const proyectoPromesa = Proyectos.findOne({
        where: {
            url: req.params.url
        }
    })
    const [proyectos, proyecto] = await Promise.all([proyectosPromesa, proyectoPromesa])
    //COnsultar tarea de proyecto
    const tareas = await Tareas.findAll({
        where: {
            ProyectoId: proyecto.id
        }
    })
console.log(tareas);
    if (!proyecto) {
        next();
    }
    // renderizamos la vista del proyecto seleccionado
    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
    })
}
exports.formularioEditar = async (req, res) => {
            const proyectosPromesa = Proyectos.findAll();
            const proyectoPromesa = Proyectos.findOne({
                where: {
                    id: req.params.id
                }
            })
            const [proyectos, proyecto] = await Promise.all([proyectosPromesa, proyectoPromesa])
            res.render('nuevoProyecto', {
                nombrePagina: 'Editar Proyecto',
                proyectos,
                proyecto
            });
        }

exports.actualizarProyecto = async (req, res) => {
            const proyectos = await Proyectos.findAll();
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
                    errores,
                    proyectos
                })
            } else {
                //insertamos registro en BD 
                await Proyectos.update(
                    { nombre: nombre }, {
                    where: { id: req.params.id }
                });
                res.redirect('/');

            }
        }
exports.eliminarProyecto = async (req, res, next) => {
            console.log(req.params);
            const { urlProyecto } = req.query;
            const resultado = await Proyectos.destroy({ where: { url: urlProyecto } });
            if (!resultado) {
                return next();
            }
            res.status(200).send("Proyecto Eliminado Correctamente");
        }