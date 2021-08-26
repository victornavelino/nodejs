const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');


exports.agregarTarea = async (req, res, next) => {
    //obtenemos el proyecto actual
    const proyecto = await Proyectos.findOne({ where: { url: req.params.url } });
    //leemos tarea
    const {tarea} =req.body;
    //estado 0 imcompleto
    const estado =0;
    const ProyectoId =proyecto.id;
    //insertamos en la base
    const resultado  = await Tareas.create({tarea,estado,ProyectoId});
    if(!resultado){
        return next();
    }
    //redireccionar pagina
    res.redirect(`/proyectos/${req.params.url}`);



}
exports.cambiarEstadoTarea = (req, res) => {
    res.send("TODO OKKKKKK");
}