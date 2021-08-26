const express = require('express');
const router = express.Router();
//aplicamos express-validator .. todos los metodos check al segmento body
const {body} = require('express-validator');
const proyectosController = require('../controllers/proyectosController')
const tareasController = require('../controllers/tareasController')


module.exports = function () {
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto', 
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto);
    //listar proyecto
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);
    //Modificar Proyecto
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
    router.post('/nuevo-proyecto/:id', 
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto);

    //eliminar Proyecto
    router.delete('/proyectos/:url',proyectosController.eliminarProyecto);
    //agregar tarea
    router.post('/proyectos/:url',tareasController.agregarTarea);
    //actualizar tarea
    router.patch('/tarea/:id',tareasController.cambiarEstadoTarea);
    return router;
}
