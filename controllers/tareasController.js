const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');


exports.agregarTarea = async (req, res) => {
    //obtenemos el proyecto actual
    const proyecto = await Proyectos.findOne({where: {url: req.params.url}});
    console.log(proyecto);
    console.log(req.body);
}